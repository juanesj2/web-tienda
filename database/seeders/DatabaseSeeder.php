<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Insertamos Electrodomésticos de prueba
        \App\Models\Electrodomestico::create([
            'nombre' => 'Lavadora UltraWash 3000',
            'descripcion' => 'Lavadora de alta eficiencia energética con capacidad de 15kg y tecnología de vapor.',
            'precio' => 499.99,
            'stock' => 10,
        ]);

        \App\Models\Electrodomestico::create([
            'nombre' => 'Refrigerador FrostFree Plus',
            'descripcion' => 'Refrigerador French Door con dispensador de agua y hielo, capacidad de 25 pies cúbicos.',
            'precio' => 899.50,
            'stock' => 5,
        ]);

        \App\Models\Electrodomestico::create([
            'nombre' => 'Microondas Chef Pro',
            'descripcion' => 'Microondas con grill y convección, múltiples programas automáticos y descongelado rápido.',
            'precio' => 129.99,
            'stock' => 0, // Agotado para probar la vista
        ]);

        \App\Models\Electrodomestico::create([
            'nombre' => 'Horno Eléctrico Multifunción',
            'descripcion' => 'Horno empotrable con 8 modos de cocción, temporizador digital y puerta de doble cristal.',
            'precio' => 349.00,
            'stock' => 7,
        ]);

        \App\Models\Electrodomestico::create([
            'nombre' => 'Licuadora Profesional 1200W',
            'descripcion' => 'Licuadora de alta potencia con vaso de vidrio de 1.5L, ideal para batidos y triturar hielo.',
            'precio' => 89.90,
            'stock' => 15,
        ]);

        \App\Models\Electrodomestico::create([
            'nombre' => 'Aspiradora Robot Inteligente',
            'descripcion' => 'Aspiradora y trapeadora con navegación láser, control por app y carga automática.',
            'precio' => 299.99,
            'stock' => 12,
        ]);

        \App\Models\Electrodomestico::create([
            'nombre' => 'Plancha de Vapor Cerámica',
            'descripcion' => 'Plancha con suela de cerámica antiadherente, golpe de vapor vertical y sistema antical.',
            'precio' => 39.50,
            'stock' => 20,
        ]);

        \App\Models\Electrodomestico::create([
            'nombre' => 'Secadora de Ropa 8kg',
            'descripcion' => 'Secadora por condensación con sensor de humedad y programas de secado rápido.',
            'precio' => 399.00,
            'stock' => 4,
        ]);

        // Insertamos Servicios de prueba
        \App\Models\Servicio::create([
            'nombre' => 'Mantenimiento Preventivo de Aire Acondicionado',
            'descripcion' => 'Limpieza profunda de filtros, revisión de gas refrigerante y limpieza de turbina.',
            'tarifa_estimada' => 45.00,
        ]);

        \App\Models\Servicio::create([
            'nombre' => 'Reparación de Motores de Lavadora',
            'descripcion' => 'Diagnóstico y reemplazo de bandas, capacitor o embobinado completo del motor principal.',
            'tarifa_estimada' => 85.00,
        ]);

        \App\Models\Servicio::create([
            'nombre' => 'Instalación de Soporte para TV',
            'descripcion' => 'Instalación segura de soporte de pared para televisores de 32 a 75 pulgadas, incluye nivelación.',
            'tarifa_estimada' => 35.00,
        ]);

        \App\Models\Servicio::create([
            'nombre' => 'Reparación de Placas Electrónicas',
            'descripcion' => 'Diagnóstico y soldadura de componentes dañados en tarjetas lógicas de electrodomésticos.',
            'tarifa_estimada' => 120.00,
        ]);

        \App\Models\Servicio::create([
            'nombre' => 'Mantenimiento de Calentador de Agua',
            'descripcion' => 'Drenaje del tanque, limpieza de quemadores y revisión de la válvula de alivio de presión.',
            'tarifa_estimada' => 60.00,
        ]);

        \App\Models\Servicio::create([
            'nombre' => 'Revisión de Fugas de Gas en Estufas',
            'descripcion' => 'Detección y sellado de fugas en tuberías interiores, válvulas y quemadores de estufas.',
            'tarifa_estimada' => 50.00,
        ]);

        \App\Models\Servicio::create([
            'nombre' => 'Limpieza y Cambio de Filtros de Campana Extractora',
            'descripcion' => 'Desengrase profundo del motor y reemplazo de filtros de carbón activado y metálicos.',
            'tarifa_estimada' => 40.00,
        ]);
    }
}
