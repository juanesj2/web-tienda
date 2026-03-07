<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ElectrodomesticoController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\ReparacionController;
use App\Http\Controllers\GoogleReviewController;

/*
|--------------------------------------------------------------------------
| Rutas Web (Web Routes)
|--------------------------------------------------------------------------
|
| Aquí es donde puedes registrar las rutas web para tu aplicación.
| Estas rutas son cargadas por el RouteServiceProvider y conectan las URLs
| a los respectivos Controladores (Controllers) o Vistas (Views).
|
*/

// Rutas Generales administradas por PageController
Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/nosotros', [PageController::class, 'about'])->name('about');
Route::get('/contacto', [PageController::class, 'contact'])->name('contact');

// API Pública de Reseñas Google
Route::get('/api/reviews', [GoogleReviewController::class, 'getReviews']);

// Rutas de Catálogo de Electrodomésticos administradas por ElectrodomesticoController
Route::get('/electrodomesticos', [ElectrodomesticoController::class, 'index'])->name('electrodomesticos.index');
Route::get('/electrodomesticos/{electrodomestico}', [ElectrodomesticoController::class, 'show'])->name('electrodomesticos.show');

// Rutas de Servicios administradas por ServicioController
Route::get('/servicios', [ServicioController::class, 'index'])->name('servicios.index');
Route::get('/servicios/{servicio}', [ServicioController::class, 'show'])->name('servicios.show');

// Rutas de Autenticación
use App\Http\Controllers\AuthController;

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

// Rutas del Panel de Administración (Protegidas)
Route::prefix('admin')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/dashboard', function () {
        return \Inertia\Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');
    
    // Rutas protegidas para Electrodomésticos gestionadas por ElectrodomesticoController
    Route::resource('electrodomesticos', ElectrodomesticoController::class)->except(['index', 'show']);
    Route::get('electrodomesticos', [ElectrodomesticoController::class, 'adminIndex'])->name('admin.electrodomesticos.index');
    
    // Rutas protegidas para Servicios gestionadas por ServicioController
    Route::resource('servicios', ServicioController::class)->except(['index', 'show']);
    Route::get('servicios', [ServicioController::class, 'adminIndex'])->name('admin.servicios.index');

    // Rutas protegidas para el Portafolio de Reparaciones
    Route::resource('reparaciones', ReparacionController::class)->except(['index', 'show', 'create', 'edit']);
    Route::get('reparaciones', [ReparacionController::class, 'index'])->name('admin.reparaciones.index');
});
