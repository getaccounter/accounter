provider "kubernetes" {}

provider "kubernetes-alpha" {
  server_side_planning = true
  config_path          = "~/.kube/config"
}


provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

provider "digitalocean" {
  token = var.do_token

  spaces_access_id  = var.s3_access_id
  spaces_secret_key = var.s3_secret_key
}

terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "1.13.3"
    }
    kubernetes-alpha = {
      source  = "hashicorp/kubernetes-alpha"
      version = "0.2.1"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "2.0.1"
    }
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
    key                         = "cluster/terraform.tfstate"
  }
}

data "digitalocean_database_cluster" "database" {
  name = "database"
}

data "digitalocean_container_registry" "accounter" {
  name = "accounter"
}

resource "digitalocean_spaces_bucket" "assets" {
  name   = "accounter-assets"
  region = "ams3"
}

resource "digitalocean_container_registry_docker_credentials" "accounter" {
  registry_name = "accounter"
}

resource "kubernetes_secret" "registry-accounter" {
  type = "kubernetes.io/dockerconfigjson"
  metadata {
    name = "registry-accounter"
  }

  data = {
    ".dockerconfigjson" = digitalocean_container_registry_docker_credentials.accounter.docker_credentials
  }
}

module "server" {
  source = "./server/terraform"

  image_tag              = var.image_tag
  image_pull_secret_name = kubernetes_secret.registry-accounter.metadata[0].name

  database = {
    user     = data.digitalocean_database_cluster.database.user
    password = data.digitalocean_database_cluster.database.password
    database = data.digitalocean_database_cluster.database.database
    url      = data.digitalocean_database_cluster.database.private_host
    port     = data.digitalocean_database_cluster.database.port
  }

  s3 = {
    bucket_name = digitalocean_spaces_bucket.assets.name
    region      = digitalocean_spaces_bucket.assets.region
    endpoint    = join("", ["https://", digitalocean_spaces_bucket.assets.bucket_domain_name])
    access_id   = var.s3_access_id
    secret_key  = var.s3_secret_key
  }

  slack = {
    client_id     = var.slack_client_id
    client_secret = var.slack_client_secret
  }

  db_token_encryption_key = var.db_token_encryption_key

  sendgrid_api_key = var.sendgrid_api_key
}

module "web" {
  source = "./web/terraform"

  image_tag              = var.image_tag
  image_pull_secret_name = kubernetes_secret.registry-accounter.metadata[0].name

  server = {
    host = module.server.host
    port = module.server.port
  }
}

module "loadbalancer" {
  source = "./loadbalancer/terraform"

  image_tag              = var.image_tag
  image_pull_secret_name = kubernetes_secret.registry-accounter.metadata[0].name

  web = {
    host = module.web.host
    port = module.web.port
  }

  server = {
    host = module.server.host
    port = module.server.port
  }
}
