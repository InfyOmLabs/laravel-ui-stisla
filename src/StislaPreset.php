<?php

namespace InfyOm\StislaPreset;

use Illuminate\Console\Command;
use Illuminate\Container\Container;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;
use InfyOm\GeneratorHelpers\LaravelUtils;
use Laravel\Ui\Presets\Preset;
use Symfony\Component\Finder\SplFileInfo;


class StislaPreset extends Preset
{
    /** @var Command */
    protected $command;

    public $isFortify = false;

    public function __construct(Command $command, $isFortify = false)
    {
        $this->command = $command;
        $this->isFortify = $isFortify;
    }

    /**
     * Update the given package array.
     *
     * @param  array  $packages
     *
     * @return array
     */
    protected static function updatePackageArray(array $packages)
    {
        return [
                "bootstrap"                     => "^4.0.0",
                "jquery"                        => "^3.2",
                "popper.js"                     => "^1.12",
                "sass"                          => "^1.15.2",
                "sass-loader"                   => "^7.1.0",
                "@fortawesome/fontawesome-free" => "^5.13.1",
                "jquery.nicescroll"             => "^3.7.6",
                "vue-template-compiler"         => "^2.6.12",
                "vue"                           => "^2.5.17",
                "datatables.net-dt"             => "^1.10.21",
                "jsrender"                      => "^1.0.5",
                "sweetalert"                    => "^1.1.3",
                "select2"                       => "^4.0.13",
                "izitoast"                      => "^1.4.0",
            ] + $packages;
    }

    public function install()
    {
        static::updatePackages(false);
        static::updateWebpackConfiguration();
        static::removeNodeModules();
        static::addMiscellaneousAssets();
    }

    /**
     * Update the Webpack configuration.
     *
     * @return void
     */
    protected static function updateWebpackConfiguration()
    {
        copy(__DIR__.'/../stisla-stubs/vendors/bootstrap/webpack.mix.js', base_path('webpack.mix.js'));
    }


    public function installAuth()
    {
        $viewsPath = LaravelUtils::getViewPath();

        $this->ensureDirectoriesExist($viewsPath);

        $this->scaffoldAuth();

        if (! $this->isFortify) {
            $this->scaffoldController();
        }
    }

    protected function ensureDirectoriesExist($viewsPath)
    {
        if (! file_exists($viewsPath.'layouts')) {
            mkdir($viewsPath.'layouts', 0755, true);
        }

        if (! file_exists($viewsPath.'profile')) {
            mkdir($viewsPath.'profile', 0755, true);
        }

        if (! file_exists($viewsPath.'auth')) {
            mkdir($viewsPath.'auth', 0755, true);
        }

        if (! file_exists($viewsPath.'auth/passwords')) {
            mkdir($viewsPath.'auth/passwords', 0755, true);
        }
    }

    private function addAuthRoutes()
    {
        file_put_contents(
            base_path('routes/web.php'),
            "\nAuth::routes();\n",
            FILE_APPEND
        );
    }

    private function addHomeRoute()
    {
        file_put_contents(
            base_path('routes/web.php'),
            "\nRoute::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');\n",
            FILE_APPEND
        );
    }

    protected function scaffoldController()
    {
        if (! is_dir($directory = app_path('Http/Controllers/Auth'))) {
            mkdir($directory, 0755, true);
        }

        $filesystem = new Filesystem();

        collect($filesystem->allFiles(base_path('vendor/laravel/ui/stubs/Auth')))
            ->each(function (SplFileInfo $file) use ($filesystem) {
                $filesystem->copy(
                    $file->getPathname(),
                    app_path('Http/Controllers/Auth/'.Str::replaceLast('.stub', '.php', $file->getFilename()))
                );
            });
    }

    protected function scaffoldAuth()
    {
        file_put_contents(app_path('Http/Controllers/HomeController.php'), $this->compileHomeControllerStub());

        $this->addHomeRoute();

        if (! $this->isFortify) {
            $this->addAuthRoutes();
        }

        tap(new Filesystem(), function ($filesystem) {
            $filesystem->copyDirectory(__DIR__.'/../stisla-stubs/views/auth', resource_path('views/auth'));
            $filesystem->copyDirectory(__DIR__.'/../stisla-stubs/views/layouts', resource_path('views/layouts'));
            $filesystem->copyDirectory(__DIR__.'/../stisla-stubs/views/profile', resource_path('views/profile'));
            $filesystem->copy(__DIR__.'/../stisla-stubs/home.blade.php', resource_path('views/home.blade.php'));


            collect($filesystem->allFiles(base_path('vendor/laravel/ui/stubs/migrations')))
                ->each(function (SplFileInfo $file) use ($filesystem) {
                    $filesystem->copy(
                        $file->getPathname(),
                        database_path('migrations/'.$file->getFilename())
                    );
                });
        });
    }

    protected function compileHomeControllerStub()
    {
        return str_replace(
            '{{namespace}}',
            Container::getInstance()->getNamespace(),
            file_get_contents(base_path('vendor/laravel/ui/src/Auth/stubs/controllers/HomeController.stub'))
        );
    }

    /**
     * Update the Webpack configuration.
     *
     * @return void
     */
    protected static function addMiscellaneousAssets()
    {
        $filesystem = new Filesystem();

        $filesystem->copyDirectory(__DIR__.'/../stisla-stubs/vendors/resources/assets', resource_path('/assets/'));
        $filesystem->copyDirectory(__DIR__.'/../stisla-stubs/vendors/resources/js', resource_path('/js/'));
        $filesystem->copyDirectory(__DIR__.'/../stisla-stubs/vendors/public', base_path('public/'));
    }
}
