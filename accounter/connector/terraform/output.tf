output "host" {
  value = kubernetes_service.connector.metadata[0].name
}

output "port" {
  value = var.port
}

