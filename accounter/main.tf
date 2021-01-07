provider "kubernetes" {}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

provider "digitalocean" {
  token = var.do_token
}

terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "1.13.3"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "2.0.1"
    }
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.3.0"
    }
  }

  backend "s3" {
    # access_key                = AWS_ACCESS_KEY_ID env var
    # secret_key                = AWS_SECRET_ACCESS_KEY env var
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    endpoint                    = "https://ams3.digitaloceanspaces.com"
    region                      = "eu-west-1"
    bucket                      = "accounter-tf-backend" // name of your space
    key                         = "cluster/terraform.tfstate"
  }
}

data "digitalocean_database_cluster" "database" {
  name = "database"
}

data "digitalocean_container_registry" "accounter" {
  name = "accounter"
}

resource "digitalocean_container_registry_docker_credentials" "accounter" {
  registry_name = "accounter"
}

locals {
  web = {
    port = 3000
  }
  server = {
    port = 8000
  }
  database = {
    ip : "10.110.0.7"
  }
  loadbalancer = {
    port : 8080
  }
}

resource "kubernetes_secret" "database-credentials" {
  type = "Opaque"
  metadata {
    name = "database-credentials"
  }

  data = {
    username = data.digitalocean_database_cluster.database.user
    password = data.digitalocean_database_cluster.database.password
  }
}


resource "kubernetes_secret" "registry-accounter" {
  type = "kubernetes.io/dockerconfigjson"
  metadata {
    name = "registry-accounter"
  }

  data = {
    ".dockerconfigjson" = digitalocean_container_registry_docker_credentials.accounter.docker_credentials
  }
}

resource "kubernetes_deployment" "server" {
  metadata {
    name = "server"
    labels = {
      app = "server"
    }
  }

  spec {
    selector {
      match_labels = {
        app = "server"
      }
    }

    template {
      metadata {
        labels = {
          app = "server"
        }
      }

      spec {
        image_pull_secrets {
          name = kubernetes_secret.registry-accounter.metadata[0].name
        }
        container {
          image = "registry.digitalocean.com/accounter/server:${var.image_tag}"
          name  = "server"
          port {
            container_port = local.server.port
          }
          env {
            name  = "PORT"
            value = local.server.port
          }
          env {
            name  = "POSTGRES_DB"
            value = data.digitalocean_database_cluster.database.database
          }
          env {
            name = "POSTGRES_USER"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.database-credentials.metadata[0].name
                key  = "username"
              }
            }
          }
          env {
            name = "POSTGRES_PASSWORD"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.database-credentials.metadata[0].name
                key  = "password"
              }
            }
          }
          env {
            name  = "POSTGRES_URL"
            value = data.digitalocean_database_cluster.database.private_host
          }
          env {
            name  = "POSTGRES_PORT"
            value = data.digitalocean_database_cluster.database.port
          }
          env {
            name  = "SLACK_CLIENT_ID"
            value = "  "
          }
          env {
            name  = "SLACK_CLIENT_SECRET"
            value = "  "
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "server" {
  metadata {
    name = "server"
  }
  spec {
    port {
      port = local.server.port
    }
    selector = {
      app = "server"
    }
  }
}

resource "kubernetes_deployment" "web" {
  metadata {
    name = "web"
    labels = {
      app = "web"
    }
  }

  spec {
    selector {
      match_labels = {
        app = "web"
      }
    }

    template {
      metadata {
        labels = {
          app = "web"
        }
      }

      spec {
        image_pull_secrets {
          name = kubernetes_secret.registry-accounter.metadata[0].name
        }
        container {
          image = "registry.digitalocean.com/accounter/web:${var.image_tag}"
          name  = "web"
          port {
            container_port = local.web.port
          }
          env {
            name  = "PORT"
            value = tostring(local.web.port)
          }
          env {
            name  = "SERVER_HOST"
            value = kubernetes_service.server.metadata[0].name
          }
          env {
            name  = "SERVER_PORT"
            value = local.server.port
          }
        }
      }
    }
  }
}



resource "kubernetes_service" "web" {
  metadata {
    name = "web"
  }
  spec {
    port {
      port = local.web.port
    }
    selector = {
      app = "web"
    }
  }
}



resource "kubernetes_deployment" "loadbalancer" {
  metadata {
    name = "loadbalancer"
    labels = {
      app = "loadbalancer"
    }
  }

  spec {
    selector {
      match_labels = {
        app = "loadbalancer"
      }
    }

    template {
      metadata {
        labels = {
          app = "loadbalancer"
        }
      }

      spec {
        image_pull_secrets {
          name = kubernetes_secret.registry-accounter.metadata[0].name
        }
        container {
          image = "registry.digitalocean.com/accounter/loadbalancer:${var.image_tag}"
          name  = "loadbalancer"
          port {
            container_port = local.loadbalancer.port
          }
          env {
            name  = "PORT"
            value = tostring(local.loadbalancer.port)
          }
          env {
            name  = "PROTOCOL"
            value = "http"
          }
          env {
            name  = "WEB_HOST"
            value = kubernetes_service.web.metadata[0].name
          }
          env {
            name  = "WEB_PORT"
            value = local.web.port
          }
          env {
            name  = "SERVER_HOST"
            value = kubernetes_service.server.metadata[0].name
          }
          env {
            name  = "SERVER_PORT"
            value = local.server.port
          }
        }
      }
    }
  }
}



resource "kubernetes_service" "loadbalancer" {
  metadata {
    name = "loadbalancer"
    annotations = {
      "kubernetes.digitalocean.com/load-balancer-id" = "3d0701a2-7cfb-440d-bed1-c93fc55ac319"
    }
  }
  spec {
    type = "LoadBalancer"
    port {
      port        = local.loadbalancer.port
      target_port = local.loadbalancer.port
    }
    selector = {
      app = "loadbalancer"
    }
  }
}

resource "helm_release" "ingress-nginx" {
  name       = "ingress-nginx"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  version    = "3.19.0"
}

resource "kubernetes_ingress" "loadbalancer" {
  metadata {
    name = "loadbalancer"
    annotations = {
      "kubernetes.io/ingress.class" = "nginx"
    }
  }

  spec {

    rule {
      host = "app.accounter.io"
      http {
        path {
          backend {
            service_name = kubernetes_service.loadbalancer.metadata[0].name
            service_port = local.loadbalancer.port
          }
        }
      }
    }
  }
  depends_on = [
    helm_release.ingress-nginx,
  ]
}
