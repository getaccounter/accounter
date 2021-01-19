

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

resource "kubernetes_secret" "slack-credentials" {
  type = "Opaque"
  metadata {
    name = "slack-credentials"
  }

  data = {
    client_id     = var.slack.client_id
    client_secret = var.slack.client_secret
  }
}

resource "kubernetes_secret" "db-token-encryption" {
  type = "Opaque"
  metadata {
    name = "db-token-encryption"
  }

  data = {
    value = var.db_token_encryption_key
  }
}

resource "kubernetes_secret" "sendgrid" {
  type = "Opaque"
  metadata {
    name = "sendgrid"
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
            name = "SLACK_CLIENT_ID"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.slack-credentials.metadata[0].name
                key  = "client_id"
              }
            }
          }
          env {
            name = "SLACK_CLIENT_SECRET"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.slack-credentials.metadata[0].name
                key  = "client_secret"
              }
            }
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
            name = "ENCRYPTION_KEY"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.db-token-encryption.metadata[0].name
                key  = "value"
              }
            }
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
                name = kubernetes_secret.sendgrid.metadata[0].name
                key  = "sendgrid_api_key"
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
