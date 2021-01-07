

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
          name = var.image_pull_secret_name
        }
        container {
          image = "registry.digitalocean.com/accounter/server:${var.image_tag}"
          name  = "server"
          port {
            container_port = var.port
          }
          env {
            name  = "PORT"
            value = tostring(var.port)
          }
          env {
            name  = "POSTGRES_DB"
            value = var.database.database
          }
          env {
            name = "POSTGRES_USER"
            value_from {
              secret_key_ref {
                name = var.database.credentials_secret_name
                key  = "username"
              }
            }
          }
          env {
            name = "POSTGRES_PASSWORD"
            value_from {
              secret_key_ref {
                name = var.database.credentials_secret_name
                key  = "password"
              }
            }
          }
          env {
            name  = "POSTGRES_URL"
            value = var.database.url
          }
          env {
            name  = "POSTGRES_PORT"
            value = var.database.port
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
      port = var.port
    }
    selector = {
      app = "server"
    }
  }
}