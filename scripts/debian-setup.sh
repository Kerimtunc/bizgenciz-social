#!/usr/bin/env bash
set -euo pipefail

USER_NAME="bizgenciz"
APP_DIR="/opt/bizgenciz-social"
REPO_URL="https://github.com/Kerimtunc/bizgenciz-social.git"

sudo adduser --system --group "$USER_NAME" || true
sudo mkdir -p "$APP_DIR"
sudo chown -R "$USER_NAME":"$USER_NAME" "$APP_DIR"

sudo -u "$USER_NAME" -H bash -lc "\
  if [ ! -d '$APP_DIR/.git' ]; then git clone $REPO_URL $APP_DIR; fi && \
  cd $APP_DIR && git pull && \
  npm ci && npm run build"

sudo cp "$APP_DIR/deploy/systemd/bizgenciz-web.service" /etc/systemd/system/
sudo cp "$APP_DIR/deploy/systemd/bizgenciz-health.service" /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now bizgenciz-web
sudo systemctl enable --now bizgenciz-health

echo "Kurulum tamamlandı. .env.local dosyanızı $APP_DIR içinde doldurmayı unutmayın."


