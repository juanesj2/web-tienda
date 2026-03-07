import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import MainLayout from '../../../Layouts/MainLayout';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../../../Contexts/LanguageContext';
import { useTheme } from '../../../Contexts/ThemeContext';

export default function Index({ reparaciones }) {
    const { t } = useLanguage();
    const { isDarkMode, accentColor } = useTheme();
    const { flash } = usePage().props;
    const [isAdding, setIsAdding] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        titulo: '',
        descripcion: '',
        imagen_url: '',
        coste_estimado: '',
        destacado: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.reparaciones.store'), {
            onSuccess: () => {
                reset();
                setIsAdding(false);
            },
        });
    };

    const confirmDelete = (id) => {
        if (confirm('¿Estás seguro de que deseas eliminar este trabajo del portafolio?')) {
            // Utilizamos Inertia para hacer la petición DELETE al controlador resource
            // Para Inertia sin un router helper complejo, la forma más fácil es destructurar el objeto router
            import('@inertiajs/react').then(({ router }) => {
                router.delete(route('admin.reparaciones.destroy', id));
            });
        }
    };

    return (
        <MainLayout>
            <Head title="Portafolio de Reparaciones" />
            
            <div className={`min-vh-100 pt-5 pb-5 ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`} style={{ transition: 'background-color 0.3s ease' }}>
                <div className="container mt-5 pt-4">
                    
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h1 className="fw-bold mb-1">Portafolio: Últimos Trabajos</h1>
                            <p className={isDarkMode ? 'text-secondary' : 'text-muted'}>
                                Gestiona las reparaciones que ven los clientes en la portada.
                            </p>
                        </div>
                        <button 
                            onClick={() => setIsAdding(!isAdding)}
                            className={`btn btn-${accentColor} rounded-pill px-4 shadow-sm`}
                        >
                            {isAdding ? 'Cancelar' : <><Plus size={18} className="me-2 mb-1" /> Nuevo Trabajo</>}
                        </button>
                    </div>

                    {flash.success && (
                        <div className="alert alert-success alert-dismissible fade show rounded-4 border-0 shadow-sm" role="alert">
                            {flash.success}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    )}

                    {/* Formulario de Añadir (Oculto por defecto) */}
                    {isAdding && (
                        <div className={`card border-0 shadow-sm rounded-4 mb-5 ${isDarkMode ? 'bg-secondary text-light bg-opacity-10' : 'bg-white'}`}>
                            <div className="card-body p-4 p-md-5">
                                <h4 className="fw-bold mb-4">Subir Nuevo Trabajo</h4>
                                <form onSubmit={submit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Título de la Reparación</label>
                                            <input 
                                                type="text" 
                                                className={`form-control rounded-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                                                value={data.titulo} 
                                                onChange={e => setData('titulo', e.target.value)}
                                                placeholder="Ej: Lavadora Balay no desaguaba"
                                                required
                                            />
                                            {errors.titulo && <div className="text-danger mt-1 small">{errors.titulo}</div>}
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Coste (Opcional - €)</label>
                                            <input 
                                                type="number" 
                                                step="0.01"
                                                className={`form-control rounded-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                                                value={data.coste_estimado} 
                                                onChange={e => setData('coste_estimado', e.target.value)}
                                                placeholder="Ej: 45.50"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-semibold">URL de la Imagen (Opcional)</label>
                                            <input 
                                                type="url" 
                                                className={`form-control rounded-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                                                value={data.imagen_url} 
                                                onChange={e => setData('imagen_url', e.target.value)}
                                                placeholder="https://ejemplo.com/mifoto.jpg"
                                            />
                                            <small className="text-muted">Si la dejas en blanco se usará una imagen bonita de stock por defecto.</small>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-semibold">Descripción (Explica qué le pasaba y cómo lo arreglaste)</label>
                                            <textarea 
                                                className={`form-control rounded-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                                                rows="3"
                                                value={data.descripcion} 
                                                onChange={e => setData('descripcion', e.target.value)}
                                                required
                                            ></textarea>
                                            {errors.descripcion && <div className="text-danger mt-1 small">{errors.descripcion}</div>}
                                        </div>
                                    </div>
                                    <div className="mt-4 text-end">
                                        <button 
                                            type="submit" 
                                            className={`btn btn-${accentColor} rounded-pill px-5`} 
                                            disabled={processing}
                                        >
                                            {processing ? 'Guardando...' : 'Publicar Trabajo'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Tabla de Trabajos */}
                    <div className={`card border-0 shadow-sm rounded-4 overflow-hidden ${isDarkMode ? 'bg-secondary text-light bg-opacity-10' : 'bg-white'}`}>
                        <div className="table-responsive">
                            <table className={`table table-hover mb-0 ${isDarkMode ? 'table-dark' : ''}`}>
                                <thead className={isDarkMode ? '' : 'table-light'}>
                                    <tr>
                                        <th scope="col" className="ps-4">Foto</th>
                                        <th scope="col">Título de Reparación</th>
                                        <th scope="col">Coste</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col" className="text-end pe-4">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reparaciones.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-5 text-muted">
                                                <ImageIcon size={48} className="mb-3 opacity-50" />
                                                <p>Todavía no has subido ninguna reparación al portafolio.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        reparaciones.map((repo) => (
                                            <tr key={repo.id} className="align-middle">
                                                <td className="ps-4">
                                                    <img 
                                                        src={repo.imagen_url || 'https://images.unsplash.com/photo-1581092918056-0c4c3acd37be?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'} 
                                                        alt={repo.titulo}
                                                        className="rounded-3 object-fit-cover"
                                                        style={{ width: '60px', height: '60px' }}
                                                    />
                                                </td>
                                                <td className="fw-semibold">{repo.titulo}</td>
                                                <td>{repo.coste_estimado ? `${repo.coste_estimado}€` : '-'}</td>
                                                <td>{new Date(repo.created_at).toLocaleDateString()}</td>
                                                <td className="text-end pe-4">
                                                    <button 
                                                        onClick={() => confirmDelete(repo.id)} 
                                                        className="btn btn-sm btn-outline-danger rounded-circle p-2"
                                                        title="Eliminar"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}
