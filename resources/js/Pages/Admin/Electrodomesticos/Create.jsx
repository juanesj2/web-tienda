import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '../../../Layouts/MainLayout';
import { useLanguage } from '../../../Contexts/LanguageContext';
import { useTheme } from '../../../Contexts/ThemeContext';
import { ArrowLeft, Save } from 'lucide-react';

export default function Create() {
    const { t } = useLanguage();
    const { isDarkMode, accentColor } = useTheme();

    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        descripcion: '',
        precio: '',
        marca: '',
        modelo: '',
        eficiencia_energetica: '',
        stock: '1',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('electrodomesticos.store'));
    };

    return (
        <MainLayout>
            <Head title="Añadir Electrodoméstico" />
            <div className={`min-vh-100 pt-5 pb-5 ${isDarkMode ? 'bg-dark' : 'bg-light'}`} style={{ transition: 'background-color 0.3s ease' }}>
                <div className="container mt-5 pt-4">
                    <div className="mb-4">
                        <Link href={route('admin.electrodomesticos.index')} className={`text-decoration-none d-flex align-items-center gap-2 mb-3 ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                            <ArrowLeft size={18} /> Volver al catálogo
                        </Link>
                        <h2 className={`fw-bold mb-0 ${isDarkMode ? 'text-white' : 'text-dark'}`}>Añadir nuevo electrodoméstico</h2>
                    </div>

                    <div className={`card border-0 shadow-sm rounded-4 ${isDarkMode ? 'bg-secondary bg-opacity-10 border border-secondary shadow-none' : 'bg-white'}`}>
                        <div className="card-body p-4 p-md-5">
                            <form onSubmit={submit}>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label className={`form-label fw-semibold ${isDarkMode ? 'text-light' : ''}`}>Nombre completo</label>
                                        <input type="text" className={`form-control form-control-lg rounded-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`} value={data.nombre} onChange={e => setData('nombre', e.target.value)} required />
                                        {errors.nombre && <div className="text-danger small mt-1">{errors.nombre}</div>}
                                    </div>
                                    <div className="col-md-3">
                                        <label className={`form-label fw-semibold ${isDarkMode ? 'text-light' : ''}`}>Marca</label>
                                        <input type="text" className={`form-control form-control-lg rounded-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`} value={data.marca} onChange={e => setData('marca', e.target.value)} required />
                                        {errors.marca && <div className="text-danger small mt-1">{errors.marca}</div>}
                                    </div>
                                    <div className="col-md-3">
                                        <label className={`form-label fw-semibold ${isDarkMode ? 'text-light' : ''}`}>Modelo</label>
                                        <input type="text" className={`form-control form-control-lg rounded-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`} value={data.modelo} onChange={e => setData('modelo', e.target.value)} required />
                                        {errors.modelo && <div className="text-danger small mt-1">{errors.modelo}</div>}
                                    </div>
                                    
                                    <div className="col-12">
                                        <label className={`form-label fw-semibold ${isDarkMode ? 'text-light' : ''}`}>Descripción detallada</label>
                                        <textarea className={`form-control rounded-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`} rows="4" value={data.descripcion} onChange={e => setData('descripcion', e.target.value)} required></textarea>
                                        {errors.descripcion && <div className="text-danger small mt-1">{errors.descripcion}</div>}
                                    </div>

                                    <div className="col-md-4">
                                        <label className={`form-label fw-semibold ${isDarkMode ? 'text-light' : ''}`}>Precio (€)</label>
                                        <input type="number" step="0.01" min="0" className={`form-control form-control-lg rounded-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`} value={data.precio} onChange={e => setData('precio', e.target.value)} required />
                                        {errors.precio && <div className="text-danger small mt-1">{errors.precio}</div>}
                                    </div>
                                    <div className="col-md-4">
                                        <label className={`form-label fw-semibold ${isDarkMode ? 'text-light' : ''}`}>Stock (Uds)</label>
                                        <input type="number" min="0" className={`form-control form-control-lg rounded-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`} value={data.stock} onChange={e => setData('stock', e.target.value)} required />
                                        {errors.stock && <div className="text-danger small mt-1">{errors.stock}</div>}
                                    </div>
                                    <div className="col-md-4">
                                        <label className={`form-label fw-semibold ${isDarkMode ? 'text-light' : ''}`}>Eficiencia (Ej. A+++)</label>
                                        <input type="text" className={`form-control form-control-lg rounded-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`} value={data.eficiencia_energetica} onChange={e => setData('eficiencia_energetica', e.target.value)} />
                                        {errors.eficiencia_energetica && <div className="text-danger small mt-1">{errors.eficiencia_energetica}</div>}
                                    </div>
                                </div>
                                <hr className={`my-4 ${isDarkMode ? 'border-secondary' : 'border-light-subtle'}`} />
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary btn-lg rounded-pill px-5 d-flex align-items-center gap-2" disabled={processing}>
                                        <Save size={20} /> Guardar
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
