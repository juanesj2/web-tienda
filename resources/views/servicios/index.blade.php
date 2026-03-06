@extends('layouts.app')

@section('title', 'Servicios de Reparación')

@section('content')
<section>
    <h1 style="text-align: center; font-size: 3rem; margin-bottom: 2rem; color: var(--accent);">Nuestros Servicios de Reparación</h1>
    <p style="text-align: center; color: var(--text-muted); margin-bottom: 3rem; max-width: 800px; margin-inline: auto;">
        Nuestros técnicos expertos están listos para devolverle la vida a tus aparatos. Selecciona el servicio que necesitas.
    </p>

    <!-- Variable $servicios inyectada desde el Controlador -->
    @if($servicios->isEmpty())
        <div style="text-align: center; padding: 4rem; background: var(--card-bg); border-radius: 12px; margin-top: 2rem;">
            <p>Actualmente no hay información de servicios detallada. Por favor, contáctanos directamente.</p>
        </div>
    @else
        <div class="grid-container">
            @foreach($servicios as $servicio)
            <div class="card" style="border-left: 4px solid var(--accent);">
                <h3>{{ $servicio->nombre }}</h3>
                <p style="min-height: 80px;">{{ $servicio->descripcion }}</p>
                <div style="margin-top: 1.5rem; text-align: right;">
                    <span style="font-size: 0.9rem; color: var(--text-muted);">Tarifa base aprox:</span>
                    <span style="font-size: 1.5rem; font-weight: 800; color: white; display: block;">
                        ${{ number_format($servicio->tarifa_estimada, 2) }}
                    </span>
                </div>
            </div>
            @endforeach
        </div>
    @endif
</section>
@endsection
