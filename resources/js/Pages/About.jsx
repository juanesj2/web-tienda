import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';

export default function About() {
    return (
        <MainLayout>
            <Head title="Nosotros" />
            
            <section style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3.5rem', color: 'var(--accent)', marginBottom: '2rem' }}>Acerca de Electronia Unitron</h1>
                <p style={{ maxWidth: '800px', fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Fundada con el objetivo de traer tecnología confiable a cada hogar, Electronia Unitron se ha consolidado como líder en la región
                    para la venta y reparación de línea blanca y línea marrón.
                </p>
                <p style={{ maxWidth: '800px', fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                    Nuestra filosofía se basa en la honestidad, transparencia y excelencia en cada diagnóstico y preventa de productos. 
                    Creemos en extender la vida útil de tus equipos o sustituirlos éticamente cuando realmente es necesario.
                </p>
            </section>
        </MainLayout>
    );
}
