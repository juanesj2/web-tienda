@extends('layouts.app')

@section('title', 'Contacto')

@section('content')
<section style="min-height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <h1 style="font-size: 3rem; margin-bottom: 3rem;">Contáctanos</h1>
    
    <form style="background: var(--card-bg); padding: 3rem; border-radius: 12px; width: 100%; max-width: 600px; border: 1px solid rgba(255, 255, 255, 0.05);">
        <div style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted);">Nombre Completo</label>
            <input type="text" style="width: 100%; padding: 1rem; border-radius: 6px; border: 1px solid var(--text-muted); background: var(--bg-dark); color: white;" placeholder="Ej. Juan Pérez">
        </div>
        <div style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted);">Correo Electrónico</label>
            <input type="email" style="width: 100%; padding: 1rem; border-radius: 6px; border: 1px solid var(--text-muted); background: var(--bg-dark); color: white;" placeholder="juan@ejemplo.com">
        </div>
        <div style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted);">Mensaje o Tipo de avería</label>
            <textarea rows="5" style="width: 100%; padding: 1rem; border-radius: 6px; border: 1px solid var(--text-muted); background: var(--bg-dark); color: white;"></textarea>
        </div>
        <button type="button" class="btn" style="width: 100%; font-size: 1.1rem;">Enviar Solicitud</button>
    </form>
</section>
@endsection
