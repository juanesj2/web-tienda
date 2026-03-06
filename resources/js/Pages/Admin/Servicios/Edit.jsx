import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '../../../Layouts/MainLayout';
import { useLanguage } from '../../../Contexts/LanguageContext';
import { useTheme } from '../../../Contexts/ThemeContext';
import { ArrowLeft, Save } from 'lucide-react';

export default function Edit({ servicio }) {
    const { t } = useLanguage();
    const { isDarkMode, accentColor } = useTheme();

    const { data, setData, put, processing, errors } = useForm({
        nombre: servicio.nombre || '',
        descripcion: servicio.descripcion || '',
        precio_estimado: servicio.precio_estimado || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('servicios.update', servicio.id));
    };

    return (
        <MainLayout>
            <Head title={`Editar ${servicio.nombre}`} />
            <div className={`min-vh-100 pt-5 pb-5 ${isDarkMode ? 'bg-dark' : 'bg-light'}`} style={{ transition: 'background-color 0.3s ease' }}>
                <div className="container mt-5 pt-4">
                    <div className="mb-4">
                        <Link href={route('admin.servicios.index')} className={`text-decoration-none d-flex align-items-center gap-2 mb-3 ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                            <ArrowLeft size={18} /> Volver a listado de servicios
                        </Link>
                        <h2 className={`fw-bold mb-0 ${isDarkMode ? 'text-white' : 'text-dark'}`}>Editar servicio</h2>
                    </div>

                    <div className={`card border-0 shadow-sm rounded-4 ${isDarkMode ? 'bg-secondary bg-opacity-10 border border-secondary shadow-none' : 'bg-white'}`}>
                        <div className="card-body p-4 p-md-5">
                            <form onSubmit={submit}>
                                <div className="row g-4">
                                    <div className="col-md-8">
                                        <label className={`form-label fw-semibold ${isDarkMode ? 'text-light' : ''}`}>Nombre del Servicio</label>
                                        <input type="text" className={`form-control form-control-lg rounded-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`} value={data.nombre} onChange={e => setData('nombre', e.target.value)} required />
                                        {errors.nombre && <div className="text-danger small mt-1">{errors.nombre}</div>}
                                    </div>
                                    <div className="col-md-4">
                                        <label className={`form-label fw-semibold ${isDarkMode ? 'text-light' : ''}`}>Precio Estimado (€)</label>
                                        <input type="number" step="0.01" min="0" className={`form-control form-control-lg rounded-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`} value={data.precio_estimado} onChange={e => setData('precio_estimado', e.target.value)} required />
                                        {errors.precio_estimado && <div className="text-danger small mt-1">{errors.precio_estimado}</div>}
                                    </div>
                                    
                                    <div className="col-12">
                                        <label className={`form-label fw-semibold ${isDarkMode ? 'text-light' : ''}`}>Descripción y detalles de la reparación</label>
                                        <textarea className={`form-control rounded-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`} rows="5" value={data.descripcion} onChange={e => setData('descripcion', e.target.value)} required></textarea>
                                        {errors.descripcion && <div className="text-danger small mt-1">{errors.descripcion}</div>}
                                    </div>
                                </div>
                                <hr className={`my-4 ${isDarkMode ? 'border-secondary' : 'border-light-subtle'}`} />
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary btn-lg rounded-pill px-5 d-flex align-items-center gap-2" disabled={processing}>
                                        <Save size={20} /> Actualizar Servicio
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
