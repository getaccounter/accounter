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

variable "s3_access_id" {
  description = "S3 access id"
  type        = string
  sensitive   = true
}

variable "s3_secret_key" {
  description = "S3 secret key"
  type        = string
  sensitive   = true
}

