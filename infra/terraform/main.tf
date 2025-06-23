terraform {
  required_version = ">= 1.7.0"
  required_providers {
    netlify = {
      source = "netlify/netlify"
      version = "~> 1.7"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.22"
    }
  }
}

module "netlify_site" {
  source  = "netlify/site/netlify"
  site_name = "spir1l-os-${terraform.workspace}"
}

resource "cloudflare_record" "spir1l_cname" {
  name  = "spir1l-os.com"
  zone_id = var.zone_id
  type  = "CNAME"
  value = module.netlify_site.default_hostname
  ttl   = 120
}
