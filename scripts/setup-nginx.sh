#!/usr/bin/env bash
set -euo pipefail

DOMAIN=${1:-}
if [ -z "$DOMAIN" ]; then
  echo "Usage: $0 yourdomain.com"
  exit 2
fi

APP_DIR="/opt/bizgenciz-social"
NGINX_SITES_AVAILABLE="/etc/nginx/sites-available"
NGINX_SITES_ENABLED="/etc/nginx/sites-enabled"

sudo cp deploy/nginx/bizgenciz.conf.template "$NGINX_SITES_AVAILABLE/bizgenciz.conf.tmp"
sudo sed -i "s/__DOMAIN__/$DOMAIN/g" "$NGINX_SITES_AVAILABLE/bizgenciz.conf.tmp"
sudo mv "$NGINX_SITES_AVAILABLE/bizgenciz.conf.tmp" "$NGINX_SITES_AVAILABLE/bizgenciz.conf"
sudo ln -sf "$NGINX_SITES_AVAILABLE/bizgenciz.conf" "$NGINX_SITES_ENABLED/bizgenciz.conf"

sudo nginx -t
sudo systemctl reload nginx

echo "Requesting Let's Encrypt cert for $DOMAIN"
sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m admin@$DOMAIN || true

sudo nginx -t
sudo systemctl reload nginx

echo "Nginx configured for $DOMAIN"


