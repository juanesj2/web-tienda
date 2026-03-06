import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';

export default function Index({ servicios }) {
    return (
        <MainLayout>
            <Head title="Servicios de Reparación" />
            
            <section className="container py-5 mt-5">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold text-primary mb-3">
                        Nuestros Servicios de Reparación
                    </h1>
                    <p className="lead text-body-secondary mx-auto" style={{ maxWidth: '800px' }}>
                        Nuestros técnicos expertos están listos para devolverle la vida a tus aparatos. Selecciona el servicio que necesitas.
                    </p>
                </div>

                {servicios.length === 0 ? (
                    <div className="text-center p-5 bg-body-tertiary rounded-4 shadow-sm border border-secondary-subtle" style={{ borderWidth: '2px' }}>
                        <p className="lead mb-0 text-body-secondary">Actualmente no hay información de servicios detallada. Por favor, contáctanos directamente.</p>
                    </div>
                ) : (
                    <div className="row g-4 justify-content-center">
                        {servicios.map((servicio) => (
                            <div className="col-12 col-md-6 col-lg-4" key={servicio.id}>
                                <div className="card h-100 shadow rounded-4 p-4 bg-body border border-secondary-subtle d-flex flex-column" style={{ borderWidth: '2px' }}>
                                    <h3 className="h4 fw-bold text-primary mb-3">{servicio.nombre}</h3>
                                    <p className="text-body-secondary flex-grow-1 mb-4">{servicio.descripcion}</p>
                                    <div className="d-flex justify-content-between align-items-end mt-auto pt-3 border-top border-secondary-subtle">
                                        <span className="small text-body-secondary">Tarifa base aprox:</span>
                                        <span className="fs-4 fw-bolder text-body">
                                            ${parseFloat(servicio.tarifa_estimada).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </MainLayout>
    );
}
