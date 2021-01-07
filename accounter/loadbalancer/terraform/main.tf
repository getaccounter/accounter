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
          name = var.image_pull_secret
        }
        container {
          image = "registry.digitalocean.com/accounter/loadbalancer:${var.image_tag}"
          name  = "loadbalancer"
          port {
            container_port = var.port
          }
          env {
            name  = "PORT"
            value = tostring(var.port)
          }
          env {
            name  = "PROTOCOL"
            value = "http"
          }
          env {
            name  = "WEB_HOST"
            value = var.web.host
          }
          env {
            name  = "WEB_PORT"
            value = var.web.port
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
      port        = var.port
      target_port = var.port
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
            service_port = var.port
          }
        }
      }
    }
  }
  depends_on = [
    helm_release.ingress-nginx,
  ]
}
