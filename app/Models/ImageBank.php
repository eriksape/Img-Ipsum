<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImageBank extends Model
{
    protected $fillable = ['origin_url', 'store', 'category_id', 'author_id'];
}
