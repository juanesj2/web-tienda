<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('electrodomesticos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre'); // Nombre del electrodoméstico
            $table->text('descripcion')->nullable(); // Descripción detallada
            $table->decimal('precio', 8, 2); // Precio con dos decimales
            $table->integer('stock')->default(0); // Cantidad en inventario
            $table->string('imagen_url')->nullable(); // URL de la imagen (opcional)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('electrodomesticos');
    }
};
