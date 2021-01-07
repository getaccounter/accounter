

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
          name = var.image_pull_secret_name
        }
        container {
          image = "registry.digitalocean.com/accounter/web:${var.image_tag}"
          name  = "web"
          port {
            container_port = var.port
          }
          env {
            name  = "PORT"
            value = tostring(var.port)
          }
          env {
            name  = "SERVER_HOST"
            value = var.server.host
          }
          env {
            name  = "SERVER_PORT"
            value = var.server.port
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
      port = var.port
    }
    selector = {
      app = "web"
    }
  }
}