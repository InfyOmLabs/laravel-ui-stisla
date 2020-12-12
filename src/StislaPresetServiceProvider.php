<?php

namespace InfyOm\StislaPreset;

use Illuminate\Support\ServiceProvider;
use Laravel\Ui\UiCommand;

class StislaPresetServiceProvider extends ServiceProvider
{
    public function boot()
    {
        UiCommand::macro('stisla', function (UiCommand $command) {
            $adminLTEPreset = new StislaPreset($command);
            $adminLTEPreset->install();

            $command->info('Stisla scaffolding installed successfully.');

            if ($command->option('auth')) {
                $adminLTEPreset->installAuth();
                $command->info('Stisla CSS auth scaffolding installed successfully.');
            }

            $command->comment('Please run "npm install && npm run dev" to compile your fresh scaffolding.');
        });
    }
}
