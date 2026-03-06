<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // Importamos Inertia para renderizar React

class PageController extends Controller
{
    /**
     * Controlador: Intermediario entre la Vista (lo que ve el usuario) y el Modelo (Base de datos).
     * Este método 'home' se encarga de mostrar la página principal de la tienda.
     */
    public function home()
    {
        // En lugar de `view('pages.home')`, le decimos a Inertia que renderice el componente de React.
        return Inertia::render('Home');
    }

    /**
     * Muestra la página "Sobre Nosotros" de Electronia Unitron.
     */
    public function about()
    {
        return Inertia::render('About');
    }

    /**
     * Muestra la página de "Contacto".
     */
    public function contact()
    {
        return Inertia::render('Contact');
    }
}
