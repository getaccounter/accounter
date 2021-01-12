output "host" {
  value = kubernetes_service.web.metadata[0].name
}

output "port" {
  value = var.port
}

