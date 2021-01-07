variable "image_tag" {
  description = "tag of mages to use"
  type        = string
}

variable "image_pull_secret_name" {
  description = "k8s secret name which provides registry credentials"
  type        = string
}

variable "port" {
  description = "Port for loadbalancer to listen to"
  type        = number
  default = 8080
}

variable "server" {
  description = "Endpoint of the server"
  type = object({
    host = string
    port = number
  })
}

variable "web" {
  description = "Endpoint of the web app"
  type = object({
    host = string
    port = number
  })
}