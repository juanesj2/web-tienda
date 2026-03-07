import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { useTheme } from '../../Contexts/ThemeContext';

export default function Show({ servicio }) {
    const { isDarkMode } = useTheme();

    return (
        <MainLayout>
            <Head title={servicio.nombre} />
            
            <section className={`min-vh-100 d-flex justify-content-center align-items-center py-5 ${isDarkMode ? 'bg-dark' : 'bg-light'}`} style={{ transition: 'background-color 0.3s ease' }}>
                <div className={`card border-0 shadow-lg rounded-4 p-4 p-md-5 w-100 ${isDarkMode ? 'bg-secondary bg-opacity-10 border border-secondary text-white' : 'bg-white text-dark'}`} style={{ maxWidth: '800px', transition: 'background-color 0.3s ease' }}>
                    
                    <h1 className="fw-bold mb-3" style={{ color: 'var(--accent)', fontSize: '2.5rem' }}>
                        {servicio.nombre}
                    </h1>

                    <div className="mb-3">
                        <span className="badge fs-6 bg-primary">
                            Servicio Profesional
                        </span>
                    </div>

                    <p className={`fs-5 lh-lg mb-4 ${isDarkMode ? 'text-light' : 'text-secondary'}`}>
                        {servicio.descripcion || 'No hay descripción disponible para este servicio.'}
                    </p>

                    <div className={`d-flex justify-content-between align-items-center pt-4 border-top ${isDarkMode ? 'border-secondary' : 'border-light-subtle'}`}>
                        <div>
                            <span className={`small d-block mb-1 ${isDarkMode ? 'text-light' : 'text-secondary'}`}>Tarifa Base Estimada:</span>
                            <p className={`fs-2 fw-bold mb-0 ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                                ${parseFloat(servicio.tarifa_estimada).toFixed(2)}
                            </p>
                        </div>
                        <Link 
                            href="/servicios" 
                            className="btn btn-outline-primary rounded-pill px-4"
                        >
                            Volver a Servicios
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
