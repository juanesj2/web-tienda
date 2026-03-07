import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { useLanguage } from '../../Contexts/LanguageContext';
import { useTheme } from '../../Contexts/ThemeContext';
import { Settings, LogOut, Package, Wrench, Users, Camera } from 'lucide-react';

export default function Dashboard() {
    const { t } = useLanguage();
    const { isDarkMode, accentColor } = useTheme();
    const { auth } = usePage().props;

    const cards = [
        {
            title: 'Electrodomésticos',
            description: 'Gestiona el catálogo de productos a la venta.',
            icon: <Package size={32} className={`text-${accentColor}`} />,
            link: route('admin.electrodomesticos.index'),
            count: '-'
        },
        {
            title: 'Servicios de Reparación',
            description: 'Administra las reparaciones y mantenimientos.',
            icon: <Wrench size={32} className={`text-${accentColor}`} />,
            link: route('admin.servicios.index'),
            count: '-'
        },
        {
            title: 'Portafolio de Trabajos',
            description: 'Sube fotos del Antes/Después de reparaciones para mostrar a los clientes.',
            icon: <Camera size={32} className={`text-${accentColor}`} />,
            link: route('admin.reparaciones.index'),
            count: '-'
        }
    ];

    return (
        <MainLayout>
            <Head title={t('nav.admin')} />

            <div className={`min-vh-100 pt-5 pb-5 ${isDarkMode ? 'bg-dark' : 'bg-light'}`} style={{ transition: 'background-color 0.3s ease' }}>
                <div className="container mt-5 pt-4">
                    
                    {/* Header */}
                    <div className="row mb-4 align-items-center">
                        <div className="col-md-8">
                            <h1 className={`fw-bold mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                                {t('nav.admin')}
                            </h1>
                            <p className={isDarkMode ? 'text-secondary' : 'text-muted'}>
                                Bienvenido de nuevo, <span className="fw-semibold">{auth.user.name}</span>.
                            </p>
                        </div>
                        <div className="col-md-4 text-md-end">
                            <Link 
                                href={route('logout')} 
                                method="post" 
                                as="button" 
                                className="btn btn-outline-danger rounded-pill px-4"
                            >
                                <LogOut size={18} className="me-2 mb-1" />
                                Cerrar Sesión
                            </Link>
                        </div>
                    </div>

                    {/* Cards */}
                    <div className="row g-4">
                        {cards.map((card, idx) => (
                            <div className="col-md-6" key={idx}>
                                <div className={`card h-100 border-0 shadow-sm rounded-4 ${isDarkMode ? 'bg-secondary text-light bg-opacity-10 border border-secondary shadow-none' : 'bg-white'}`}>
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div className={`p-3 rounded-4 ${isDarkMode ? 'bg-dark' : 'bg-light'}`}>
                                                {card.icon}
                                            </div>
                                            <span className={`badge rounded-pill fs-6 ${isDarkMode ? 'bg-dark text-light border border-secondary' : 'bg-light text-dark'}`}>
                                                {card.count} Registros
                                            </span>
                                        </div>
                                        <h4 className="card-title fw-bold mb-2">{card.title}</h4>
                                        <p className={`card-text mb-4 ${isDarkMode ? 'text-secondary text-opacity-75' : 'text-muted'}`}>
                                            {card.description}
                                        </p>
                                        <Link 
                                            href={card.link}
                                            className={`btn btn-sm px-4 rounded-pill ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
                                        >
                                            Gestionar {card.title}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}
