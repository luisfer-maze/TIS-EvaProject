<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('proyectos', function (Blueprint $table) {
            $table->string('ID_PROYECTO', 50)->primary();
            $table->string('NOMBRE_PROYECTO', 1000);
            $table->dateTime('FECHA_INICIO_PROYECTO')->nullable();
            $table->dateTime('FECHA_FIN_PROYECTO')->nullable();
            $table->string('DESCRIP_PROYECTO', 1000)->nullable();
            $table->string('PORTADA_PROYECTO', 1000)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proyectos');
    }
};
