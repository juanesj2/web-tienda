@extends('layouts.app')

@section('title', 'Nosotros')

@section('content')
<section style="min-height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
    <h1 style="font-size: 3.5rem; color: var(--accent); margin-bottom: 2rem;">Acerca de Electronia Unitron</h1>
    <p style="max-width: 800px; font-size: 1.2rem; color: var(--text-muted); margin-bottom: 2rem;">
        Fundada con el objetivo de traer tecnología confiable a cada hogar, Electronia Unitron se ha consolidado como líder en la región
        para la venta y reparación de línea blanca y línea marrón.
    </p>
    <p style="max-width: 800px; font-size: 1.2rem; color: var(--text-muted);">
        Nuestra filosofía se basa en la honestidad, transparencia y excelencia en cada diagnóstico y preventa de productos. 
        Creemos en extender la vida útil de tus equipos o sustituirlos éticamente cuando realmente es necesario.
    </p>
</section>
@endsection
