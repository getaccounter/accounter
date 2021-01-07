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
          name = var.image_pull_secret_name
        }
        container {
          image = "registry.digitalocean.com/accounter/loadbalancer:${var.image_tag}"
          name  = "loadbalancer"
          port {
            container_port = 8080
          }
          env {
            name  = "PORT"
            value = tostring(8080)
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
  }
  spec {
    port {
      port        = 80
      target_port = 8080
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
      "kubernetes.io/ingress.class"    = "nginx"
      "cert-manager.io/cluster-issuer" = "letsencrypt-prod"
    }
  }

  spec {
    tls {
      hosts       = ["app.accounter.io"]
      secret_name = "accounter-tls"
    }
    rule {
      host = "app.accounter.io"
      http {
        path {
          backend {
            service_name = kubernetes_service.loadbalancer.metadata[0].name
            service_port = 80
          }
        }
      }
    }
  }
  depends_on = [
    helm_release.ingress-nginx,
    kubernetes_manifest.cert-issuer
  ]
}

resource "kubernetes_namespace" "cert-manager" {
  metadata {
    name = "cert-manager"
  }
}

resource "helm_release" "cert-manager" {
  name       = "cert-manager"
  repository = "https://charts.jetstack.io"
  chart      = "cert-manager"
  version    = "1.1.0"
  namespace  = kubernetes_namespace.cert-manager.metadata[0].name

  set {
    name  = "installCRDs"
    value = "true"
  }
}


resource "kubernetes_manifest" "cert-issuer" {
  provider = kubernetes-alpha
  manifest = {
    "apiVersion" = "cert-manager.io/v1alpha2"
    "kind"       = "ClusterIssuer"
    "metadata" = {
      "name" = "letsencrypt-prod"
    }
    "spec" = {
      "acme" = {
        "email" = "admin@accounter.io"
        "privateKeySecretRef" = {
          "name" = "letsencrypt-prod-private-key"
        }
        "server" = "https://acme-v02.api.letsencrypt.org/directory"
        "solvers" = [
          {
            "http01" = {
              "ingress" = {
                "class" = "nginx"
              }
            }
          },
        ]
      }
    }
  }
  depends_on = [helm_release.cert-manager]
}
