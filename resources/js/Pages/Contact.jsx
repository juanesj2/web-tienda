import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';

export default function Contact() {
    return (
        <MainLayout>
            <Head title="Contacto" />
            
            <section style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '3rem' }}>Contáctanos</h1>
                
                <form 
                    style={{ background: 'var(--card-bg)', padding: '3rem', borderRadius: '12px', width: '100%', maxWidth: '600px', border: '1px solid rgba(255, 255, 255, 0.05)' }}
                    onSubmit={(e) => { e.preventDefault(); alert("¡Formulario de prueba enviado!"); }}
                >
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Nombre Completo</label>
                        <input type="text" style={{ width: '100%', padding: '1rem', borderRadius: '6px', border: '1px solid var(--text-muted)', background: 'var(--bg-dark)', color: 'white' }} placeholder="Ej. Juan Pérez" required />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Correo Electrónico</label>
                        <input type="email" style={{ width: '100%', padding: '1rem', borderRadius: '6px', border: '1px solid var(--text-muted)', background: 'var(--bg-dark)', color: 'white' }} placeholder="juan@ejemplo.com" required />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Mensaje o Tipo de avería</label>
                        <textarea rows="5" style={{ width: '100%', padding: '1rem', borderRadius: '6px', border: '1px solid var(--text-muted)', background: 'var(--bg-dark)', color: 'white' }} required></textarea>
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%', fontSize: '1.1rem', cursor: 'pointer', border: 'none' }}>Enviar Solicitud</button>
                </form>
            </section>
        </MainLayout>
    );
}
