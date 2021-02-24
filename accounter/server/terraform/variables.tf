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

variable "database" {
  description = "Endpoint of the database"
  type = object({
    user     = string
    password = string
    database = string
    url      = string
    port     = number
  })
  sensitive = true
}

variable "s3" {
  description = "S3 access info"
  type = object({
    endpoint    = string
    bucket_name = string
    access_id   = string
    secret_key  = string
    region      = string
  })
  sensitive = true
}

variable "sendgrid_api_key" {
  description = "API key for sending emails"
  type        = string
  sensitive   = true
}

variable "connector" {
  description = "Endpoint of the connector"
  type = object({
    host = string
    port = number
  })
}

variable "secret_key" {
  description = "django SECRET_KEY"
  type        = string
  sensitive   = true
}