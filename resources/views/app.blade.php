<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <title inertia>{{ config('app.name', 'Electronia Unitron') }}</title>

        <!-- Tipografías de Google Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
        
        <!-- CSS y configuración de Vite -->
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx', 'public/css/style.css'])
        
        <!-- Encabezado de la página gestionada por Inertia -->
        @routes
        @inertiaHead
    </head>
    <body class="bg-body text-body">
        <!-- Div Raíz donde se renderizan todos los componentes de React -->
        @inertia
    </body>
</html>
