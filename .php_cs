<?php

    $finder = Symfony\CS\Finder\DefaultFinder::create()
        ->exclude('vendor')
        ->exclude('tests')
        ->exclude('storage')
        ->exclude('resources')
        ->exclude('public')
        ->exclude('database')
        ->exclude('config')
        ->exclude('bootstrap')
        ->in(__DIR__);

    return Symfony\CS\Config\Config::create()
        ->setUsingCache(false)
        ->level(Symfony\CS\FixerInterface::PSR2_LEVEL)
        ->fixers([
            '-psr0',
        ])
        ->finder($finder);
