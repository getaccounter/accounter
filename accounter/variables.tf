variable "do_token" {
  description = "DO access token"
  type        = string
  sensitive   = true
}

variable "app_version" {
  description = "version of current release"
  type        = string
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

variable "slack_state_secret" {
  description = "state secret for slack oauth flow - randomly set"
  type        = string
  sensitive   = true
}

variable "google_client_id" {
  description = "google client id"
  type        = string
  sensitive   = true
}

variable "google_client_secret" {
  description = "google client secret"
  type        = string
  sensitive   = true
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



variable "sendgrid_api_key" {
  description = "API key for sending emails"
  type        = string
  sensitive   = true
}