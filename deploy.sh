#!/bin/bash
# ============================================
# Independence Sentinel — Server Deploy Script
# Run this on the Hetzner/ServerAvatar server
# ============================================

set -e

APP_DIR="/home/serveravatar/applications/independencesentinel.com"
REPO="https://github.com/trekkalab/independence-sentinel.git"

echo "=== Independence Sentinel Deploy ==="

# ---- 1. Setup Postgres (run once) ----
setup_postgres() {
  echo "Setting up PostgreSQL..."
  sudo apt-get update
  sudo apt-get install -y postgresql postgresql-contrib

  # Create database and user
  sudo -u postgres psql -c "CREATE USER sentinel_user WITH PASSWORD 'CHANGE_THIS_PASSWORD';" 2>/dev/null || true
  sudo -u postgres psql -c "CREATE DATABASE independence_sentinel OWNER sentinel_user;" 2>/dev/null || true
  sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE independence_sentinel TO sentinel_user;" 2>/dev/null || true

  echo "PostgreSQL setup complete."
  echo "IMPORTANT: Change the password above and update .env DATABASE_URI"
}

# ---- 2. Clone or pull repo ----
setup_repo() {
  if [ -d "$APP_DIR/.git" ]; then
    echo "Pulling latest code..."
    cd "$APP_DIR"
    git pull origin main
  else
    echo "Cloning repository..."
    git clone "$REPO" "$APP_DIR"
    cd "$APP_DIR"
  fi
}

# ---- 3. Install dependencies and build ----
build_app() {
  cd "$APP_DIR"
  echo "Installing dependencies..."
  npm ci --production=false

  echo "Building Next.js..."
  npm run build

  echo "Build complete."
}

# ---- 4. Setup .env ----
setup_env() {
  cd "$APP_DIR"
  if [ ! -f ".env" ]; then
    echo "Creating .env from template..."
    cp .env.production.example .env
    # Generate a random secret
    RANDOM_SECRET=$(openssl rand -hex 32)
    sed -i "s/CHANGE_ME_TO_A_RANDOM_64_CHAR_STRING/$RANDOM_SECRET/" .env
    echo ""
    echo "========================================"
    echo "  IMPORTANT: Edit .env and set:"
    echo "  - DATABASE_URI (Postgres password)"
    echo "  - PAYLOAD_SECRET (auto-generated)"
    echo "========================================"
    echo ""
  fi
}

# ---- 5. Start/restart with PM2 ----
start_app() {
  cd "$APP_DIR"
  echo "Starting app with PM2..."

  # Install PM2 globally if not present
  which pm2 > /dev/null 2>&1 || npm install -g pm2

  pm2 delete independence-sentinel 2>/dev/null || true
  pm2 start ecosystem.config.cjs
  pm2 save

  echo "App started on port 3000"
}

# ---- 6. Setup Nginx reverse proxy (ServerAvatar handles this, but here for reference) ----
show_nginx_config() {
  cat << 'NGINX'

If you need to manually configure Nginx, add this to the server block:

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
  }

NGINX
}

# ---- Run ----
case "${1:-deploy}" in
  setup)
    setup_postgres
    setup_repo
    setup_env
    build_app
    start_app
    show_nginx_config
    ;;
  deploy)
    setup_repo
    build_app
    start_app
    ;;
  postgres)
    setup_postgres
    ;;
  build)
    build_app
    start_app
    ;;
  *)
    echo "Usage: ./deploy.sh [setup|deploy|postgres|build]"
    echo "  setup   — First-time setup (Postgres + clone + build + start)"
    echo "  deploy  — Pull latest + build + restart (default)"
    echo "  postgres — Install and configure PostgreSQL only"
    echo "  build   — Build and restart only (no git pull)"
    ;;
esac

echo "=== Done ==="
