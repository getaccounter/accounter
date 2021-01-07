variable "do_token" {
  description = "DO access token"
  type        = string
  sensitive   = true
}

variable "image_tag" {
  description = "tag of mages to use"
  type        = string
  default     = "e09116801642220cb6e28762cd035042ee1cab82"
}