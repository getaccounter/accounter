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
  default = 8000
}

variable "database" {
  description = "Endpoint of the database"
  type = object({
    database = string
    credentials_secret_name = string
    url = string
    port = number
  })
}

variable "s3" {
  description = "Endpoint of the database"
  type = object({
    endpoint = string
    bucket_name = string
    credentials_secret_name = string
    region = string
  })
}