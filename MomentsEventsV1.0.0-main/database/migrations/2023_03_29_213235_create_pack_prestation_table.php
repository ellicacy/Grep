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
        Schema::create('pack_prestation', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('prestation_id')->constrained();
            // $table->foreignId('pack_id')->constrained();
            $table->unsignedBigInteger('prestation_id');
            $table->unsignedBigInteger('pack_id');
            $table->foreign('prestation_id')->references('id')->on('prestations')->onDelete('cascade');
            $table->foreign('pack_id')->references('id')->on('packs')->onDelete('cascade');
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
        Schema::dropIfExists('pack_prestation');
    }
};
