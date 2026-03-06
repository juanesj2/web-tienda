import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import MainLayout from '../../../Layouts/MainLayout';
import { useLanguage } from '../../../Contexts/LanguageContext';
import { useTheme } from '../../../Contexts/ThemeContext';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function Index({ electrodomesticos }) {
    const { t } = useLanguage();
    const { isDarkMode, accentColor } = useTheme();
    const auth = usePage()?.props?.auth || {};
    const flash = usePage()?.props?.flash || {};
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar este electrodoméstico?')) {
            destroy(route('electrodomesticos.destroy', id));
        }
    };

    return (
        <MainLayout>
            <Head title="Gestionar Electrodomésticos" />
            <div className={`min-vh-100 pt-5 pb-5 ${isDarkMode ? 'bg-dark' : 'bg-light'}`} style={{ transition: 'background-color 0.3s ease' }}>
                <div className="container mt-5 pt-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className={`fw-bold mb-0 ${isDarkMode ? 'text-white' : 'text-dark'}`}>Electrodomésticos</h2>
                        <Link href={route('electrodomesticos.create')} className="btn btn-primary rounded-pill d-flex align-items-center gap-2">
                            <Plus size={18} />
                            Añadir Nuevo
                        </Link>
                    </div>

                    {(flash.message || flash.success) && (
                        <div className="alert alert-success alert-dismissible fade show rounded-4" role="alert">
                            {flash.message || flash.success}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    )}

                    <div className={`card border-0 shadow-sm rounded-4 overflow-hidden ${isDarkMode ? 'bg-secondary bg-opacity-10 border border-secondary shadow-none' : 'bg-white'}`}>
                        <div className="table-responsive">
                            <table className={`table table-hover mb-0 ${isDarkMode ? 'table-dark table-borderless caption-top' : ''}`}>
                                <thead className={isDarkMode ? 'bg-dark' : 'table-light'}>
                                    <tr>
                                        <th scope="col" className="ps-4">ID</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Marca / Modelo</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col" className="text-end pe-4">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {electrodomesticos.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="text-center py-5 text-muted">No hay electrodomésticos registrados.</td>
                                        </tr>
                                    ) : (
                                        electrodomesticos.map(item => (
                                            <tr key={item.id}>
                                                <td className="ps-4 align-middle">{item.id}</td>
                                                <td className="align-middle fw-semibold">{item.nombre}</td>
                                                <td className="align-middle">{item.marca} <span className="text-muted small">({item.modelo})</span></td>
                                                <td className="align-middle fw-bold">{item.precio}€</td>
                                                <td className="align-middle">
                                                    <span className={`badge rounded-pill ${item.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                                                        {item.stock} uds
                                                    </span>
                                                </td>
                                                <td className="text-end pe-4 align-middle">
                                                    <Link href={route('electrodomesticos.edit', item.id)} className="btn btn-sm btn-outline-primary rounded-circle me-2 p-2">
                                                        <Edit size={16} />
                                                    </Link>
                                                    <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-outline-danger rounded-circle p-2">
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
