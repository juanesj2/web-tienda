<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reparacion;
use Inertia\Inertia; // Importamos Inertia para renderizar React

class PageController extends Controller
{
    /**
     * Controlador: Intermediario entre la Vista (lo que ve el usuario) y el Modelo (Base de datos).
     * Este método 'home' se encarga de mostrar la página principal de la tienda.
     */
    public function home()
    {
        // Obtain the 3 latest jobs from the portfolio
        $ultimosTrabajos = Reparacion::orderBy('created_at', 'desc')->take(3)->get();

        // Pass the jobs to the React component
        return Inertia::render('Home', [
            'ultimosTrabajos' => $ultimosTrabajos
        ]);
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
