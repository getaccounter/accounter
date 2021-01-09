

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
          env {
            name  = "AWS_STORAGE_BUCKET_NAME"
            value = var.s3.bucket_name
          }
          env {
            name  = "AWS_S3_ENDPOINT_URL"
            value = var.s3.endpoint
          }
          env {
            name  = "AWS_DEFAULT_REGION"
            value = var.s3.region
          }
          env {
            name = "AWS_ACCESS_KEY_ID"
            value_from {
              secret_key_ref {
                name = var.s3.credentials_secret_name
                key  = "access_id"
              }
            }
          }
          env {
            name = "AWS_SECRET_ACCESS_KEY"
            value_from {
              secret_key_ref {
                name = var.s3.credentials_secret_name
                key  = "secret_key"
              }
            }
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