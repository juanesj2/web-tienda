import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { useTheme } from '../../Contexts/ThemeContext';

export default function Show({ electrodomestico }) {
    const { isDarkMode } = useTheme();
    const isEnStock = electrodomestico.stock > 0;

    return (
        <MainLayout>
            <Head title={electrodomestico.nombre} />
            
            <section className={`min-vh-100 d-flex justify-content-center align-items-center py-5 ${isDarkMode ? 'bg-dark' : 'bg-light'}`} style={{ transition: 'background-color 0.3s ease' }}>
                <div className={`card border-0 shadow-lg rounded-4 p-4 p-md-5 w-100 ${isDarkMode ? 'bg-secondary bg-opacity-10 border border-secondary text-white' : 'bg-white text-dark'}`} style={{ maxWidth: '800px', transition: 'background-color 0.3s ease' }}>
                    
                    <h1 className="fw-bold mb-3" style={{ color: 'var(--accent)', fontSize: '2.5rem' }}>
                        {electrodomestico.nombre}
                    </h1>

                    <div className="mb-3">
                        <span className={`badge fs-6 ${isEnStock ? 'bg-success' : 'bg-danger'}`}>
                            {isEnStock ? `En Stock: ${electrodomestico.stock} disponibles` : 'Agotado'}
                        </span>
                    </div>

                    {electrodomestico.marca && (
                        <p className={`mb-1 small ${isDarkMode ? 'text-light' : 'text-secondary'}`}>
                            <strong>Marca:</strong> {electrodomestico.marca}
                            {electrodomestico.modelo && <> · <strong>Modelo:</strong> {electrodomestico.modelo}</>}
                        </p>
                    )}
                    {electrodomestico.eficiencia_energetica && (
                        <p className={`mb-3 small ${isDarkMode ? 'text-light' : 'text-secondary'}`}>
                            <strong>Eficiencia:</strong> {electrodomestico.eficiencia_energetica}
                        </p>
                    )}

                    <p className={`fs-5 lh-lg mb-4 ${isDarkMode ? 'text-light' : 'text-secondary'}`}>
                        {electrodomestico.descripcion || 'No hay descripción disponible para este producto.'}
                    </p>

                    <div className={`d-flex justify-content-between align-items-center pt-4 border-top ${isDarkMode ? 'border-secondary' : 'border-light-subtle'}`}>
                        <p className={`fs-2 fw-bold mb-0 ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                            ${parseFloat(electrodomestico.precio).toFixed(2)}
                        </p>
                        <Link 
                            href="/electrodomesticos" 
                            className="btn btn-outline-primary rounded-pill px-4"
                        >
                            Volver al Catálogo
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}


