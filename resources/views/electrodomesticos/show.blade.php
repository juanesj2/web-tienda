@extends('layouts.app')

@section('title', $electrodomestico->nombre)

@section('content')
<section style="min-height: 80vh; display: flex; justify-content: center; align-items: center;">
    <div style="background: var(--card-bg); padding: 4rem; border-radius: 12px; max-width: 800px; width: 100%; border: 1px solid rgba(255,255,255,0.05);">
        
        <h1 style="color: var(--accent); font-size: 2.5rem; margin-bottom: 1rem;">{{ $electrodomestico->nombre }}</h1>
        <span style="display: inline-block; background: {{ $electrodomestico->stock > 0 ? '#10b981' : '#ef4444' }}; color: white; padding: 0.3rem 0.8rem; border-radius: 4px; font-weight: bold; margin-bottom: 2rem;">
            {{ $electrodomestico->stock > 0 ? 'En Stock: '.$electrodomestico->stock.' disponibles' : 'Agotado' }}
        </span>

        <p style="font-size: 1.2rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 3rem;">
            {{ $electrodomestico->descripcion ?? 'No hay descripción disponible para este producto.' }}
        </p>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem;">
            <p style="font-size: 2rem; font-weight: 800; color: white;">${{ number_format($electrodomestico->precio, 2) }}</p>
            <a href="{{ route('electrodomesticos.index') }}" class="btn" style="background: transparent; border: 1px solid var(--accent); color: var(--accent);">Volver al Catálogo</a>
        </div>
    </div>
</section>
@endsection
