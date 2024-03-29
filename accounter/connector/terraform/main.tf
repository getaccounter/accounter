resource "kubernetes_secret" "slack-credentials" {
  type = "Opaque"
  metadata {
    name = "slack-credentials"
  }

  data = {
    client_id     = var.slack.client_id
    client_secret = var.slack.client_secret
    state_secret  = var.slack.state_secret
  }
}

resource "kubernetes_secret" "google-workspace-credentials" {
  type = "Opaque"
  metadata {
    name = "google-workspace-credentials"
  }

  data = {
    client_id     = var.google.client_id
    client_secret = var.google.client_secret
  }
}

resource "kubernetes_secret" "zoom-workspace-credentials" {
  type = "Opaque"
  metadata {
    name = "zoom-workspace-credentials"
  }

  data = {
    client_id     = var.zoom.client_id
    client_secret = var.zoom.client_secret
  }
}

resource "kubernetes_secret" "github-credentials" {
  type = "Opaque"
  metadata {
    name = "github-credentials"
  }

  data = {
    app_id      = var.github.app_id
    private_key = var.github.private_key
  }
}

resource "kubernetes_secret" "token-encryption" {
  type = "Opaque"
  metadata {
    name = "token-encryption"
  }

  data = {
    value = var.token_encryption_key
  }
}


resource "kubernetes_deployment" "connector" {
  metadata {
    name = "connector"
    labels = {
      app = "connector"
    }
  }

  spec {
    selector {
      match_labels = {
        app = "connector"
      }
    }

    template {
      metadata {
        labels = {
          app = "connector"
        }
      }

      spec {
        image_pull_secrets {
          name = var.image_pull_secret_name
        }
        container {
          image = "registry.digitalocean.com/accounter/connector:${var.app_version}"
          name  = "connector"
          port {
            container_port = var.port
          }
          env {
            name  = "PORT"
            value = tostring(var.port)
          }
          env {
            name  = "VERSION"
            value = var.app_version
          }
          env {
            name = "ENCRYPTION_KEY"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.token-encryption.metadata[0].name
                key  = "value"
              }
            }
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
            name = "SLACK_STATE_SECRET"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.slack-credentials.metadata[0].name
                key  = "state_secret"
              }
            }
          }
          # Google
          env {
            name = "GOOGLE_CLIENT_ID"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.google-workspace-credentials.metadata[0].name
                key  = "client_id"
              }
            }
          }
          env {
            name = "GOOGLE_CLIENT_SECRET"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.google-workspace-credentials.metadata[0].name
                key  = "client_secret"
              }
            }
          }
          # Zoom
          env {
            name = "ZOOM_CLIENT_ID"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.zoom-workspace-credentials.metadata[0].name
                key  = "client_id"
              }
            }
          }
          env {
            name = "ZOOM_CLIENT_SECRET"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.zoom-workspace-credentials.metadata[0].name
                key  = "client_secret"
              }
            }
          }
          # Zoom
          env {
            name = "GITHUB_APP_ID"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.github-credentials.metadata[0].name
                key  = "app_id"
              }
            }
          }
          env {
            name = "GITHUB_PRIVATE_KEY"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.github-credentials.metadata[0].name
                key  = "private_key"
              }
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "connector" {
  metadata {
    name = "connector"
  }
  spec {
    port {
      port = var.port
    }
    selector = {
      app = "connector"
    }
  }
}
