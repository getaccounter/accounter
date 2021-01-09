variable "image_tag" {
  description = "tag of images to use"
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
  description = "Endpoint of the database"
  type = object({
    endpoint    = string
    bucket_name = string
    access_id   = string
    secret_key  = string
    region      = string
  })
  sensitive = true
}
