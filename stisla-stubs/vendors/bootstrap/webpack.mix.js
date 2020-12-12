const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js');
mix.styles(['resources/js/app.js'], 'public/css/app.css').version();

mix.styles([
    'public/css/social-icons.css',
    'public/css/owl.carousel.css',
    'public/css/owl.theme.css',
    'public/css/prism.css',
    'public/css/main.css',
    'public/css/custom.css',
], 'public/css/all.css').version();

mix.js(
    'public/js/scripts.js', 'public/js/scripts.min.js')
    .js('resources/assets/js/profile.js', 'public/assets/js/profile.js')
    .js('resources/assets/js/custom/custom.js', 'public/assets/js/custom/custom.js')
    .js('resources/assets/js/custom/custom-datatable.js', 'public/assets/js/custom/custom-datatable.js')
    .version();


mix.copy('node_modules/bootstrap/dist/css/bootstrap.min.css',
    'public/assets/css/bootstrap.min.css');

mix.copy('node_modules/datatables.net-dt/css/jquery.dataTables.min.css',
    'public/assets/css/jquery.dataTables.min.css');
mix.copy('node_modules/datatables.net-dt/images', 'public/assets/images');
mix.copy('node_modules/select2/dist/css/select2.min.css',
    'public/assets/css/select2.min.css');
mix.copy('node_modules/sweetalert/dist/sweetalert.css',
    'public/assets/css/sweetalert.css');
mix.copy('node_modules/izitoast/dist/css/iziToast.min.css',
    'public/assets/css/iziToast.min.css');

mix.copyDirectory('node_modules/@fortawesome/fontawesome-free/css',
    'public/assets/css/@fortawesome/fontawesome-free/css');
mix.copyDirectory('node_modules/@fortawesome/fontawesome-free/webfonts',
    'public/assets/css/@fortawesome/fontawesome-free/webfonts');

mix.babel('node_modules/jquery.nicescroll/dist/jquery.nicescroll.js',
    'public/assets/js/jquery.nicescroll.js');
mix.babel('node_modules/jquery/dist/jquery.min.js',
    'public/assets/js/jquery.min.js');
mix.babel('node_modules/popper.js/dist/umd/popper.min.js',
    'public/assets/js/popper.min.js');
mix.babel('node_modules/bootstrap/dist/js/bootstrap.min.js',
    'public/assets/js/bootstrap.min.js');
mix.babel('node_modules/datatables.net/js/jquery.dataTables.min.js',
    'public/assets/js/jquery.dataTables.min.js');
mix.babel('node_modules/select2/dist/js/select2.min.js',
    'public/assets/js/select2.min.js');
mix.babel('node_modules/sweetalert/dist/sweetalert.min.js',
    'public/assets/js/sweetalert.min.js');
mix.babel('node_modules/izitoast/dist/js/iziToast.min.js',
    'public/assets/js/iziToast.min.js');
