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
        Schema::create('evenements', function (Blueprint $table) {
            $table->id();
            $table->string('evenementNom');
            $table->string('evenementDescription');
            $table->date('evenementDate');
            $table->string('evenementRue');
            $table->integer('evenementCP');
            $table->string('evenementVille');
            $table->integer('evenementNbrPersonne');
            $table->time('evenementHeureDebut');
            $table->time('evenementHeureFin');
            $table->string('evenementStatus');
            $table->string('paiementNo');
            $table->decimal('paiementMontant',8,2);
            $table->string('paiementType');
            $table->string('paiementStatus');
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
        Schema::dropIfExists('evenements');
    }
};
