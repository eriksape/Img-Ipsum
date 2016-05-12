<?php

use Illuminate\Database\Seeder;
use App\Models\Category;
class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create( [
            'name'    => 'undefined',
            'counter' => 0
        ] );

        if(app()->environment('acceptance')){

            Category::create( [
                'name'  => 'acceptance',
                'counter'  => 0
            ] );

        }
    }
}
