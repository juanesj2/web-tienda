@extends('layouts.app')

@section('title', 'Inicio')

@section('content')
<section class="hero">
    <h1>Soluciones Inteligentes para tu Hogar</h1>
    <p>En Electronia Unitron nos especializamos en la venta y reparación de electrodomésticos de alta gama con garantía de satisfacción.</p>
    <a href="{{ route('electrodomesticos.index') }}" class="btn">Explorar Catálogo</a>
</section>

<section>
    <h2 style="text-align: center; margin-bottom: 3rem;">¿Por qué elegirnos?</h2>
    <div class="grid-container">
        <div class="card">
            <h3>Servicio Técnico Especializado</h3>
            <p>Contamos con técnicos certificados para resolver cualquier problema de tus electrodomésticos rápidamente.</p>
        </div>
        <div class="card">
            <h3>Productos de Calidad</h3>
            <p>Vendemos los mejores equipos del mercado, rigurosamente probados para asegurar una larga vida útil.</p>
        </div>
        <div class="card">
            <h3>Atención Inmediata</h3>
            <p>Sabemos que tus aparatos son vitales, por lo que ofrecemos atención al cliente rápida y efectiva todos los días.</p>
        </div>
    </div>
</section>
@endsection
