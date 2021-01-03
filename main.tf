variable "do_token" {}
variable "do_space_access_id" {}
variable "do_space_access_secret" {}

provider "digitalocean" {
  token             = var.do_token
  spaces_access_id  = var.do_space_access_id
  spaces_secret_key = var.do_space_access_secret
}

terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.3.0"
    }
  }

  backend "s3" {
    # access_key                = AWS_ACCESS_KEY_ID env var
    # secret_key                = AWS_SECRET_ACCESS_KEY env var
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    endpoint                    = "https://ams3.digitaloceanspaces.com"
    region                      = "eu-west-1"
    bucket                      = "accounter-terraform-backend" // name of your space
    key                         = "production/terraform.tfstate"
  }
}

resource "digitalocean_container_registry" "accounter-repo" {
  name                   = "accounter"
  subscription_tier_slug = "basic"
}

resource "digitalocean_database_cluster" "postgres" {
  name       = "database"
  engine     = "pg"
  version    = "12"
  size       = "db-s-1vcpu-1gb"
  region     = "ams3"
  node_count = 1
}

resource "digitalocean_spaces_bucket" "terraform-backend" {
  name   = "accounter-terraform-backend"
  region = "ams3"
}

resource "digitalocean_kubernetes_cluster" "accounter" {
  name    = "accounter"
  region  = "ams3"
  version = "1.19.3-do.2"

  node_pool {
    name       = "worker-pool"
    size       = "s-1vcpu-2gb"
    node_count = 1
  }
}
