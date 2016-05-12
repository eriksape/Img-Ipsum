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
            'name'  => 'undefined',
            'site'  => 'undefined'
        ] );

        if(app()->environment('acceptance')){

            Author::create( [
                'name'  => 'acceptance',
                'site'  => 'acceptance.com'
            ] );

        }
    }
}
