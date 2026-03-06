<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Electrodomestico extends Model
{
    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'stock',
        'imagen_url',
    ];
}
