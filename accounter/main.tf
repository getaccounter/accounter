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
  server = {
    port = 8000
  }
  database = {
    ip : "10.110.0.7"
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

module "web" {
  source = "./web/terraform"

  image_tag = var.image_tag
  image_pull_secret_name = kubernetes_secret.registry-accounter.metadata[0].name

  server = {
    host = kubernetes_service.server.metadata[0].name
    port = local.server.port
  }
}

module "loadbalancer" {
  source = "./loadbalancer/terraform"

  image_tag = var.image_tag
  image_pull_secret_name = kubernetes_secret.registry-accounter.metadata[0].name

  web = {
    host = module.web.host
    port = module.web.port
  }

  server = {
    host = kubernetes_service.server.metadata[0].name
    port = local.server.port
  }
}