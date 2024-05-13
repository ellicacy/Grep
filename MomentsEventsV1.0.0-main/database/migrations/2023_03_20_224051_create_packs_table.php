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
        Schema::create('packs', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('description');
            // POUR L'INSTANT
            // $table->integer('quantite')->nullable();
            // MAIS IL FAUDRAIT CREER CET ATTRIBUT DANS UNE TABLE D'ASSOCIATION ENTRE PRESTATION ET PACK
            $table->decimal('prix_fixe')->nullable();
            $table->string('unite')->nullable();
            $table->decimal('prix_unite')->nullable();
            $table->timestamps();
            //MomentsEvents
            $table->decimal('unite_max')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('packs');
    }
};
