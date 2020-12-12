<?php

namespace InfyOm\StislaPreset;

use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Fortify;
use Laravel\Ui\UiCommand;

class FortifyStislaPresetServiceProvider extends ServiceProvider
{
    public function boot()
    {
        UiCommand::macro('stisla-fortify', function (UiCommand $command) {
            $fortifyAdminLTEPreset = new StislaPreset($command, true);
            $fortifyAdminLTEPreset->install();

            $command->info('Stisla scaffolding installed successfully for Laravel Fortify.');

            if ($command->option('auth')) {
                $fortifyAdminLTEPreset->installAuth();
                $command->info('Stisla CSS auth scaffolding installed successfully for Laravel Fortify.');
            }

            $command->comment('Please run "npm install && npm run dev" to compile your fresh scaffolding.');
        });

        if (class_exists(Fortify::class)) {
            Fortify::loginView(function () {
                return view('auth.login');
            });

            Fortify::registerView(function () {
                return view('auth.register');
            });

            Fortify::confirmPasswordView(function () {
                return view('auth.passwords.confirm');
            });

            Fortify::requestPasswordResetLinkView(function () {
                return view('auth.passwords.email');
            });

            Fortify::resetPasswordView(function () {
                return view('auth.passwords.reset');
            });

            Fortify::verifyEmailView(function () {
                return view('auth.verify');
            });
        }
    }
}
