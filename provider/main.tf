provider "digitalocean" {
  token = var.do_token
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
    bucket                      = "accounter-tf-backend" // name of your space
    key                         = "provider/terraform.tfstate"
  }
}

resource "digitalocean_container_registry" "accounter" {
  name                   = "accounter"
  subscription_tier_slug = "basic"
}

resource "digitalocean_database_cluster" "database" {
  name       = "databaseDev"
  engine     = "pg"
  version    = "12"
  size       = "db-s-1vcpu-1gb"
  region     = "ams3"
  node_count = 1
}

resource "digitalocean_database_firewall" "database-fw" {
  cluster_id = digitalocean_database_cluster.database.id

  rule {
    type  = "k8s"
    value = digitalocean_kubernetes_cluster.accounter.id
  }
}

resource "digitalocean_kubernetes_cluster" "accounter" {
  name    = "accounter"
  region  = "ams3"
  version = "1.19.3-do.3"

  node_pool {
    name       = "worker-pool"
    size       = "s-1vcpu-2gb"
    node_count = 1
  }
}
