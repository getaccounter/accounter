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

variable "slack_client_id" {
  description = "slack client id"
  type        = string
  sensitive   = true
}

variable "slack_client_secret" {
  description = "slack client secret"
  type        = string
  sensitive   = true
}

variable "db_token_encryption_key" {
  description = "encryption key for service tokens"
  type        = string
  sensitive   = true
}

