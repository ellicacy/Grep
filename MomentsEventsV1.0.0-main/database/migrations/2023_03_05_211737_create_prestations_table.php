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
        Schema::create('prestations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_user');
            $table->string('nom')->nullable();
            $table->string('description')->nullable();
            $table->string('photo')->nullable();
            $table->string('contrainte')->nullable();
            $table->string('type_facturation')->nullable();
            $table->decimal('prix_type_facturation')->nullable();
            $table->time('duree')->nullable();
            $table->integer('personne_min')->nullable();
            $table->integer('personne_max')->nullable();
            $table->time('heure_min')->nullable();
            $table->time('heure_max')->nullable();
            $table->decimal('score',2)->nullable()->default(0.00);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('prestations');
    }
};
