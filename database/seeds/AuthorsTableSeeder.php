<?php

use Illuminate\Database\Seeder;
use App\Models\Author;
class AuthorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Author::create( [
            'author'      => 'undefined',
            'author_site' => 'undefined'
        ] );
    }
}
