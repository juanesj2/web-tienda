#!/bin/sh
set -e

# Parse DATABASE_URL into individual DB_* vars that Laravel understands
# Format: postgres://user:password@host:port/dbname
if [ ! -z "$DATABASE_URL" ]; then
    DB_URL="${DATABASE_URL#postgres://}"
    DB_USERPASS="${DB_URL%%@*}"
    DB_HOST_DB="${DB_URL##*@}"
    export DB_USERNAME="${DB_USERPASS%%:*}"
    export DB_PASSWORD="${DB_USERPASS##*:}"
    DB_HOST_PORT="${DB_HOST_DB%%/*}"
    export DB_DATABASE="${DB_HOST_DB##*/}"
    export DB_HOST="${DB_HOST_PORT%%:*}"
    export DB_PORT="${DB_HOST_PORT##*:}"
    export DB_CONNECTION="pgsql"
    echo "Database: $DB_HOST:$DB_PORT/$DB_DATABASE"
fi

# Generate app key if not set
if [ -z "$APP_KEY" ]; then
    php artisan key:generate --force
fi

# Wait for database to be ready
echo "Waiting for database..."
sleep 5

# Run migrations
php artisan migrate --force

# Clear and cache config for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Fix permissions
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Start supervisor (nginx + php-fpm)
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf

