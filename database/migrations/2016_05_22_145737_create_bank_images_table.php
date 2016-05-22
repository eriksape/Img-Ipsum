<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBankImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bank_images', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('origin_url')->uniq();
            $table->integer('category_id')->unsigned();
            $table->integer('author_id')->unsigned();
            $table->integer('file_storage_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('category_id')->references('id')->on('categories');
            $table->foreign('author_id')->references('id')->on('authors');
            $table->foreign('file_storage_id')->references('id')->on('file_storages');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('bank_images');
    }
}
