<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categorie_prestation', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('prestation_id');
            $table->unsignedBigInteger('categorie_id');
            $table->foreign('prestation_id')->references('id')->on('prestations');
            $table->foreign('categorie_id')->references('id')->on('categories');
            $table->timestamps();
        });
    }

    // Schema::table('categorie_prestation', function($table) {
    //     $table->foreign('prestation_id')->references('id')->on('prestations')->onDelete('cascade');
    //     $table->foreign('categorie_id')->references('id')->on('categories')->onDelete('cascade');
    // });
    
    // $table->foreignId('prestation_id')->constrained();
    // $table->foreignId('categorie_id')->constrained();


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categorie_prestation');
    }
};
