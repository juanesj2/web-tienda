#!/bin/sh
set -e

# Generate app key if not set
if [ -z "$APP_KEY" ]; then
    php artisan key:generate --force
fi

# Wait for database connection
echo "Waiting for database..."
sleep 5

# Run migrations
php artisan migrate --force

# Fix permissions
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Create log directories for supervisor
mkdir -p /var/log/supervisor /var/log/nginx

# Start supervisor (nginx + php-fpm)
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf


