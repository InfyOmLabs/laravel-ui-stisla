# Laravel UI Stisla

[![Total Downloads](https://poser.pugx.org/infyomlabs/laravel-ui-stisla/downloads)](https://packagist.org/packages/infyomlabs/laravel-ui-stisla)
[![Monthly Downloads](https://poser.pugx.org/infyomlabs/laravel-ui-stisla/d/monthly)](https://packagist.org/packages/infyomlabs/laravel-ui-stisla)
[![Daily Downloads](https://poser.pugx.org/infyomlabs/laravel-ui-stisla/d/daily)](https://packagist.org/packages/infyomlabs/laravel-ui-stisla)
[![License](https://poser.pugx.org/infyomlabs/laravel-ui-stisla/license)](https://packagist.org/packages/infyomlabs/laravel-ui-stisla)

[Laravel Frontend Scaffolding](https://laravel.com/docs/7.x/frontend) for [Stisla UI](https://demo.getstisla.com/index.html) Theme.

## Installation

Run a command,

`composer require infyomlabs/laravel-ui-stisla`

For Laravel 7,

`composer require infyomlabs/laravel-ui-stisla:^2.0`

For Laravel 6,

`composer require infyomlabs/laravel-ui-stisla:^1.0`

## Usage

Run a command,

To Generate a full authentication UI,

`php artisan ui stisla --auth`

To Install just AdminLTE theme assets,

`php artisan ui stisla`

And then run,

`npm install && npm run dev`

Or for production,

`npm install && npm run prod`

## Usage with Laravel Fortify (Laravel 8.x only)

This package also provides support for Laravel Fortify for authentication scaffolding.

**NOTE**: Don't forget to install and run Laravel Fortify and perform its required installation steps.

Run a command,

`php artisan ui adminlte-stisla --auth`

And then run,

`npm install && npm run dev`

Or for production,

`npm install && npm run prod`

## Screenshots

### Login

![Login](screenshots/Login.png)

### Register

![Register](screenshots/Register.png)

### Reset Password Form

![Reset Password Form](screenshots/Reset-Password-Form.png)

### Reset Password

![Reset Password](screenshots/Reset-Password.png)

### Admin Layout

![Reset Password](screenshots/Admin-Layout.png)

### Edit Profile
![Edit Profile](screenshots/Edit-Profile.png)
