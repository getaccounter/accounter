output "host" {
  value = kubernetes_service.server.metadata[0].name
}

output "port" {
  value = var.port
}

