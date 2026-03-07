import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { Search, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../Contexts/LanguageContext';

export default function Index({ servicios }) {
    const { lang } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedItem, setSelectedItem] = useState(null);

    const categorias = ['Todos', 'Instalación', 'Reparación', 'Mantenimiento', 'Revisión'];

    const filteredServicios = useMemo(() => {
        return servicios.filter(servicio => {
            const matchesSearch = servicio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  servicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
                                  
            let matchesCategory = true;
            if (selectedCategory !== 'Todos') {
                matchesCategory = servicio.nombre.toLowerCase().includes(selectedCategory.toLowerCase());
            }

            return matchesSearch && matchesCategory;
        });
    }, [servicios, searchTerm, selectedCategory]);

    return (
        <MainLayout>
            <Head>
                <title>Servicio Técnico y Reparaciones | Electrónica Unitron</title>
                <meta name="description" content="Reparación garantizada de televisiones, lavadoras, frigoríficos y todo tipo de aparatos. Juan Vicente repara a domicilio o en nuestro taller. Precios justos." />
            </Head>
            
            <section className="container py-4 py-md-5 mt-4 mt-md-5">
                <div className="text-center mb-4 mb-md-5">
                    <h1 className="display-5 display-md-4 fw-bold text-primary mb-2 mb-md-3">
                        Nuestros Servicios de Reparación
                    </h1>
                    <p className="lead text-body-secondary mx-auto mobile-lead-text" style={{ maxWidth: '800px' }}>
                        Juan Vicente se desplaza a tu casa o lo arregla en el taller. Soluciones honestas para que no tires lo que aún tiene arreglo.
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="row justify-content-center mb-4 mb-md-5">
                    <div className="col-12 col-md-8 col-lg-6 mb-3">
                        <div className="position-relative">
                            <span className="position-absolute top-50 translate-middle-y ms-3 text-body-secondary">
                                <Search size={20} />
                            </span>
                            <input 
                                type="text" 
                                className="form-control form-control-lg rounded-pill ps-5 bg-body text-body border-secondary-subtle focus-ring" 
                                placeholder="Buscar servicios..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ borderWidth: '2px' }}
                            />
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="d-flex flex-nowrap overflow-auto pb-2 gap-2 justify-content-md-center custom-scrollbar">
                            {categorias.map(cat => (
                                <button
                                    key={cat}
                                    className={`btn rounded-pill px-3 py-1 flex-shrink-0 fw-semibold ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-secondary bg-body text-body border-secondary-subtle'}`}
                                    onClick={() => setSelectedCategory(cat)}
                                    style={{ fontSize: '0.9rem' }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {filteredServicios.length === 0 ? (
                    <div className="text-center p-4 p-md-5 bg-body-tertiary rounded-4 shadow-sm border border-secondary-subtle" style={{ borderWidth: '2px' }}>
                        <p className="lead mb-0 text-body-secondary">
                            {servicios.length === 0 
                                ? "Actualmente no hay información de servicios detallada. Por favor, contáctanos directamente."
                                : "No se encontraron servicios que coincidan con tu búsqueda."
                            }
                        </p>
                    </div>
                ) : (
                    <div className="row g-2 g-md-4 justify-content-center">
                        {filteredServicios.map((servicio) => (
                            <div className="col-6 col-md-6 col-lg-4" key={servicio.id}>
                                <div className="card h-100 shadow-sm rounded-4 p-2 p-md-4 bg-body border border-secondary-subtle d-flex flex-column border-mobile-1" style={{ borderWidth: '2px' }}>
                                    <h3 className="h6 h4-md fw-bold text-primary mb-2 mb-md-3 text-truncate">{servicio.nombre}</h3>
                                    <p className="text-body-secondary flex-grow-1 mb-2 mb-md-4 small mobile-lead-text d-none d-sm-block">
                                        {servicio.descripcion.length > 80 
                                            ? `${servicio.descripcion.substring(0, 80)}...` 
                                            : servicio.descripcion}
                                    </p>
                                    <p className="text-body-secondary flex-grow-1 mb-2 small d-block d-sm-none" style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>
                                        {servicio.descripcion.length > 40 
                                            ? `${servicio.descripcion.substring(0, 40)}...` 
                                            : servicio.descripcion}
                                    </p>
                                    <div className="d-flex flex-column flex-xxl-row justify-content-between align-items-start align-items-xxl-center mt-auto pt-2 pt-md-3 border-top border-secondary-subtle gap-2">
                                        <div>
                                            <span className="small text-body-secondary d-block" style={{ fontSize: '0.75rem', lineHeight: '1' }}>Tarifa aprox:</span>
                                            <span className="fs-6 fs-md-5 fw-bolder text-body">
                                                ${parseFloat(servicio.tarifa_estimada).toFixed(2)}
                                            </span>
                                        </div>
                                        <button 
                                            onClick={() => setSelectedItem(servicio)}
                                            className="btn btn-outline-primary rounded-pill px-2 px-md-3 py-1 py-md-2 fw-semibold w-100 w-xxl-auto text-center" 
                                            style={{ fontSize: '0.8rem' }}
                                        >
                                            Detalles
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {/* --- SECCIÓN ZONAS DE DESPLAZAMIENTO --- */}
                <div className="row mt-5 pt-4">
                    <div className="col-12">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="card border-0 shadow-sm rounded-4 bg-primary bg-opacity-10 py-4 py-md-5 px-3 px-md-5 text-center overflow-hidden position-relative border-mobile-1"
                        >
                            <div className="position-absolute top-0 end-0 p-4 opacity-10 d-none d-md-block">
                                <MapPin size={120} />
                            </div>
                            
                            <div className="position-relative" style={{ zIndex: 1 }}>
                                <div className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle mb-3 shadow-sm" style={{ width: '60px', height: '60px' }}>
                                    <MapPin size={28} />
                                </div>
                                <h3 className="fw-bold mb-3 text-primary">Zonas a las que nos desplazamos</h3>
                                <p className="lead text-body-secondary mb-4 mx-auto" style={{ maxWidth: '700px' }}>
                                    Juan Vicente realiza intervenciones a domicilio en nuestro pueblo y sus alrededores cercanos. <span className="fw-semibold text-body">Si traes el aparato al taller, la revisión es gratuita.</span>
                                </p>
                                
                                <div className="d-flex flex-wrap justify-content-center gap-2 gap-md-3">
                                    <span className="badge bg-white text-body border border-secondary px-3 py-2 rounded-pill fs-6 shadow-sm">📍 Nuestro Pueblo (Centro)</span>
                                    <span className="badge bg-white text-body border border-secondary px-3 py-2 rounded-pill fs-6 shadow-sm">📍 Pedanías Cercanas</span>
                                    <span className="badge bg-white text-body border border-secondary px-3 py-2 rounded-pill fs-6 shadow-sm">📍 Urbanizaciones del Norte</span>
                                </div>
                                
                                <p className="text-muted small mt-4 mb-0">
                                    * Para desplazamientos a más de 15km, consúltanos la tarifa de transporte antes de solicitar la visita.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

            </section>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                        style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050, padding: '1rem', backdropFilter: 'blur(4px)' }}
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div 
                            initial={{ y: 50, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="card border-0 shadow-lg rounded-4 w-100 position-relative overflow-hidden bg-body text-body"
                            style={{ maxWidth: '600px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setSelectedItem(null)} 
                                className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-3 rounded-circle bg-body" 
                                style={{ width: '32px', height: '32px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
                            >
                                <X size={18} />
                            </button>
                            
                            <div className="card-body p-4 p-md-5 overflow-auto custom-scrollbar">
                                <h2 className="fw-bold mb-3 text-primary text-break" style={{ fontSize: '1.75rem', paddingRight: '20px' }}>
                                    {selectedItem.nombre}
                                </h2>

                                <div className="mb-3">
                                    <span className="badge fs-6 bg-primary">
                                        Servicio Profesional
                                    </span>
                                </div>

                                <p className="fs-6 lh-base mb-4 text-body mt-3">
                                    {selectedItem.descripcion || 'No hay descripción disponible para este servicio.'}
                                </p>

                                <div className="d-flex justify-content-between align-items-center pt-3 border-top border-secondary-subtle mt-auto">
                                    <div>
                                        <span className="small d-block mb-1 text-body-secondary">Tarifa Base Estimada:</span>
                                        <p className="fs-2 fw-bold mb-0 text-body">
                                            ${parseFloat(selectedItem.tarifa_estimada).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </MainLayout>
    );
}
