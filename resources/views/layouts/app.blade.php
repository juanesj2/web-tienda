<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Electronia Unitron | @yield('title')</title>
    <!-- CSS Vanilla para un diseño aesthetic -->
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css'])
</head>
<body>

    <main>
        <!-- Aquí se inyectará el contenido de cada vista individual (Las 'Vistas' del MVC) -->
        @yield('content')
    </main>

    <footer>
        <p>&copy; 2026 Electronia Unitron. Pagina web creada por <a href="https://github.com/juanesj2" >juanes 😎</a>, aun esta en desarrollo.</p>
    </footer>
</body>
</html>
