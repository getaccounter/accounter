variable "app_version" {
  description = "version"
  type        = string
}

variable "image_pull_secret_name" {
  description = "k8s secret name which provides registry credentials"
  type        = string
}

variable "port" {
  description = "Port for server to listen to"
  type        = number
  default     = 8000
}

variable "slack" {
  description = "Slack credentials"
  type = object({
    client_id     = string
    client_secret = string
    state_secret  = string
  })
  sensitive = true
}

variable "google" {
  description = "Google credentials"
  type = object({
    client_id     = string
    client_secret = string
  })
  sensitive = true
}

variable "zoom" {
  description = "Zoom credentials"
  type = object({
    client_id     = string
    client_secret = string
  })
  sensitive = true
}

variable "github" {
  description = "GitHub credentials"
  type = object({
    app_id      = string
    private_key = string
  })
  sensitive = true
}

variable "token_encryption_key" {
  description = "encryption key for service tokens"
  type        = string
  sensitive   = true

  # validation {
  #   condition     = length(var.token_encryption_key) != 32
  #   error_message = "Token_encryption_key must be 32  characters long."
  # }
}