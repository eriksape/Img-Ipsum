<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name','counter'];

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->counter = 0;
        });
        //static::updating(function ($model){});
        //static::deleting(function ($model){});
        //static::created(function($model){});
        //static::updated(function($model){});
        //static::deleted(function($model){});
    }
}
