FROM php:8.4-apache

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    libzip-dev \
    libcurl4-openssl-dev \
    libicu-dev \
    pkg-config \
    g++ \
    zip \
    unzip \
    default-mysql-client 

# Install PHP extensions (pcntl not supported on Apache SAPI)
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_pgsql mbstring exif bcmath gd zip curl intl

COPY docker/vhost.conf /etc/apache2/sites-available/000-default.conf

RUN a2enmod rewrite

RUN php -r "readfile('http://getcomposer.org/installer');" | php -- --install-dir=/usr/bin/ --filename=composer

ARG WWW_USER=1000

# Create user
RUN groupadd --force -g $WWW_USER webapp
RUN useradd -ms /bin/bash --no-user-group -g $WWW_USER -u $WWW_USER webapp

USER ${WWW_USER}