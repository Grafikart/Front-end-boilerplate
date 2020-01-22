FROM php:7.2-cli

RUN apt-get update && apt-get install -y \
        unzip \
        libcurl3-dev \
        git \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libmcrypt-dev \
        libpng-dev \
        libzip-dev \
        libxml2-dev
RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/
RUN docker-php-ext-install -j$(nproc) iconv mysqli pdo_mysql zip soap gd
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer

WORKDIR /usr/src/myapp
