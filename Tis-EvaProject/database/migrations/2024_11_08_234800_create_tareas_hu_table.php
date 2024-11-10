<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('tareas_hu', function (Blueprint $table) {
            $table->bigIncrements('ID_TAREAHU'); // Clave primaria
            $table->unsignedBigInteger('ID_HU'); // Llave foránea a historias_usuario
            $table->string('TITULO_TAREAHU');
            $table->string('ESTADO_TAREAHU');
            $table->string('RESPONSABLE_TAREAHU')->nullable();
            $table->timestamps();

            // Definir la relación con la tabla historias_usuario
            $table->foreign('ID_HU')->references('ID_HU')->on('historias_usuario')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tareas_hu', function (Blueprint $table) {
            //
        });
    }
};
