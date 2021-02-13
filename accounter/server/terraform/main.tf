

resource "kubernetes_secret" "database-credentials" {
  type = "Opaque"
  metadata {
    name = "database-credentials"
  }

  data = {
    user     = var.database.user
    password = var.database.password
  }
}

resource "kubernetes_secret" "s3-credentials" {
  type = "Opaque"
  metadata {
    name = "s3-credentials"
  }

  data = {
    access_id  = var.s3.access_id
    secret_key = var.s3.secret_key
  }
}

resource "kubernetes_secret" "sendgrid-api-key" {
  type = "Opaque"
  metadata {
    name = "sendgrid-api-key"
  }

  data = {
    value = var.sendgrid_api_key
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
          name = var.image_pull_secret_name
        }
        container {
          image = "registry.digitalocean.com/accounter/server:${var.image_tag}"
          name  = "server"
          port {
            container_port = var.port
          }
          liveness_probe {
            http_get {
              path = "/get_csrf_cookie"
              port = var.port
            }
            initial_delay_seconds = 120
            period_seconds        = 60
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
                name = kubernetes_secret.database-credentials.metadata[0].name
                key  = "user"
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
            value = var.database.url
          }
          env {
            name  = "POSTGRES_PORT"
            value = var.database.port
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
                name = kubernetes_secret.s3-credentials.metadata[0].name
                key  = "access_id"
              }
            }
          }
          env {
            name = "AWS_SECRET_ACCESS_KEY"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.s3-credentials.metadata[0].name
                key  = "secret_key"
              }
            }
          }
          env {
            name  = "ENVIRONMENT"
            value = "production"
          }
          env {
            name  = "BASE_URL"
            value = "https://app.accounter.io"
          }

          # sendgrid
          env {
            name  = "EMAIL_HOST"
            value = "smtp.sendgrid.net"
          }
          env {
            name  = "EMAIL_HOST_USER"
            value = "apikey"
          }
          env {
            name = "EMAIL_HOST_PASSWORD"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.sendgrid-api-key.metadata[0].name
                key  = "value"
              }
            }
          }
          env {
            name  = "EMAIL_PORT"
            value = 587
          }
          env {
            name  = "EMAIL_USE_TLS"
            value = "True"
          }

          # Connector
          env {
            name  = "CONNECTOR_HOST"
            value = var.connector.host
          }
          env {
            name  = "CONNECTOR_PORT"
            value = var.connector.port
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
