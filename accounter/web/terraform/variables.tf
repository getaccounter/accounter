variable "app_version" {
  description = "version"
  type        = string
}

variable "image_pull_secret_name" {
  description = "k8s secret name which provides registry credentials"
  type        = string
}

variable "port" {
  description = "Port for web to listen to"
  type        = number
  default     = 3000
}

variable "server" {
  description = "Endpoint of the server"
  type = object({
    host = string
    port = number
  })
}