import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';

export default function Index({ electrodomesticos }) {
    return (
        <MainLayout>
            <Head title="Catálogo de Electrodomésticos" />
            
            <section className="container py-5 mt-5">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold text-primary mb-3">
                        Electrodomésticos Disponibles
                    </h1>
                    <p className="lead text-body-secondary mx-auto" style={{ maxWidth: '800px' }}>
                        Encuentra los mejores equipos para tu hogar a precios increíbles.
                    </p>
                </div>

                {electrodomesticos.length === 0 ? (
                    <div className="text-center p-5 bg-body-tertiary rounded-4 shadow-sm border border-secondary-subtle" style={{ borderWidth: '2px' }}>
                        <p className="lead mb-0 text-body-secondary">Actualmente no hay electrodomésticos disponibles en el catálogo. ¡Vuelve pronto!</p>
                    </div>
                ) : (
                    <div className="row g-4 justify-content-center">
                        {electrodomesticos.map((item) => (
                            <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                                <div className="card h-100 shadow rounded-4 p-4 bg-body border border-secondary-subtle d-flex flex-column" style={{ borderWidth: '2px' }}>
                                    <h3 className="h4 fw-bold text-primary mb-3">{item.nombre}</h3>
                                    {/* React no tiene Str::limit nativo, recortamos el texto manual */}
                                    <p className="text-body-secondary flex-grow-1 mb-4">
                                        {item.descripcion.length > 80 
                                            ? `${item.descripcion.substring(0, 80)}...` 
                                            : item.descripcion}
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top border-secondary-subtle">
                                        <span className="fs-5 fw-bolder text-body">${parseFloat(item.precio).toFixed(2)}</span>
                                        <Link 
                                            href={`/electrodomesticos/${item.id}`} 
                                            className="btn btn-outline-primary rounded-pill px-3 py-2 fw-semibold" 
                                            style={{ fontSize: '0.9rem' }}
                                        >
                                            Ver Detalles
                                        </Link>
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
