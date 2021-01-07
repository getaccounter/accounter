variable "do_token" {
  description = "DO access token"
  type        = string
  sensitive   = true
}

variable "image_tag" {
  description = "tag of images to use"
  type        = string
  default     = "latest"
}