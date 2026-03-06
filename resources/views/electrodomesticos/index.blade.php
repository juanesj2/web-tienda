@extends('layouts.app')

@section('title', 'Catálogo de Electrodomésticos')

@section('content')
<section>
    <h1 style="text-align: center; font-size: 3rem; margin-bottom: 1rem; color: var(--accent);">Electrodomésticos Disponibles</h1>
    <p style="text-align: center; color: var(--text-muted); margin-bottom: 3rem;">Encuentra los mejores equipos para tu hogar a precios increíbles.</p>

    <!-- En la Vista del MVC, recibimos la variable $electrodomesticos del Controlador -->
    @if($electrodomesticos->isEmpty())
        <div style="text-align: center; padding: 3rem; background: var(--card-bg); border-radius: 12px;">
            <p>Actualmente no hay electrodomésticos disponibles en el catálogo. ¡Vuelve pronto!</p>
        </div>
    @else
        <div class="grid-container">
            @foreach($electrodomesticos as $item)
            <div class="card">
                <h3>{{ $item->nombre }}</h3>
                <p>{{ Str::limit($item->descripcion, 80) }}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
                    <span class="price">${{ number_format($item->precio, 2) }}</span>
                    <a href="{{ route('electrodomesticos.show', $item->id) }}" class="btn" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Ver Detalles</a>
                </div>
            </div>
            @endforeach
        </div>
    @endif
</section>
@endsection
