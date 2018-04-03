FROM php:7.1-cli

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php -r "if (hash_file('SHA384', 'composer-setup.php') === '544e09ee996cdf60ece3804abc52599c22b1f40f4323403c44d44fdfdd586475ca9813a858088ffbc1f233e9b180f061') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
    && php composer-setup.php \
    && mv composer.phar /usr/local/bin/composer \
    && php -r "unlink('composer-setup.php');"

RUN apt-get update && apt-get install -y \
        unzip \
        libcurl3-dev \
        git \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libmcrypt-dev \
        libpng-dev \
        libxml2-dev
RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/
RUN docker-php-ext-install -j$(nproc) iconv mcrypt mysqli pdo_mysql zip soap gd

RUN composer require --dev phpunit/phpunit ^6.5
WORKDIR /tmp
RUN composer selfupdate && \
  composer require "phpunit/phpunit:^6.5" && \
  ln -s /tmp/vendor/bin/phpunit /usr/local/bin/phpunit
WORKDIR /usr/src/myapp
