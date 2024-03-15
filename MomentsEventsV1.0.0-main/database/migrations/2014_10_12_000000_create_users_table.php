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
        Schema::create('users', function (Blueprint $table) {
            $table->id('idPersonne');
            $table->string('personneLogin')->unique();
            $table->string('password')->nullable();
            $table->string('personneNom')->nullable();
            $table->string('personnePrenom')->nullable();
            $table->string('personneEmail')->nullable();
            $table->date('personneDateNaissance')->nullable();
            $table->string('isActive')->default(true);
            $table->string('clientRue')->nullable();
            $table->integer('clientCodePostal')->nullable();
            $table->string('clientVille')->nullable();
            $table->string('prestaireType')->nullable();
            $table->string('prestataireDescription')->nullable();
            $table->string('prestatairePhotos')->nullable();
            $table->string('prestataireEntrepriseNom')->nullable();
            $table->string('prestataireEntrepriseRue')->nullable();
            $table->integer('prestataireEntrepriseCP')->nullable();
            $table->string('prestataireEntrepriseVille')->nullable();
            $table->string('prestataireNoTVA')->nullable();
            $table->string('prestataireBanque')->nullable();
            $table->string('prestataireBanqueRue')->nullable();
            $table->integer('prestataireBanqueCP')->nullable();
            $table->string('prestataireBanqueVille')->nullable();
            $table->integer('prestataireSWIFT')->nullable();
            $table->string('prestataireIBAN')->nullable();
            $table->decimal('prestataireScore',2)->nullable()->default(0.00);
            $table->rememberToken();
            $table->timestamps();
            $table->string('api_token', 80)->unique()->nullable()->default(null);

            // les roles sont : user, prestataire, admin
            $table->string('role');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
