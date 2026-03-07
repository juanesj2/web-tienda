import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Index({ electrodomesticos }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedItem, setSelectedItem] = useState(null);

    const categorias = ['Todos', 'Lavadora', 'Frigorífico', 'Televisor', 'Horno', 'Microondas', 'Aire Acondicionado'];

    const filteredItems = useMemo(() => {
        return electrodomesticos.filter(item => {
            const matchesSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  item.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
            
            let matchesCategory = true;
            if (selectedCategory !== 'Todos') {
                // Check if the item's name generally includes the category name
                matchesCategory = item.nombre.toLowerCase().includes(selectedCategory.toLowerCase());
            }
            
            return matchesSearch && matchesCategory;
        });
    }, [electrodomesticos, searchTerm, selectedCategory]);

    return (
        <MainLayout>
            <Head>
                <title>Catálogo de Electrodomésticos | Electrónica Unitron</title>
                <meta name="description" content="Descubre nuestra amplia selección de electrodomésticos: lavadoras, frigoríficos, hornos y más. Primeras marcas con la garantía y asesoramiento de Juan Vicente." />
            </Head>
            
            <section className="container py-4 py-md-5 mt-4 mt-md-5">
                <div className="text-center mb-4 mb-md-5">
                    <h1 className="display-5 display-md-4 fw-bold text-primary mb-2 mb-md-3">
                        Electrodomésticos Disponibles
                    </h1>
                    <p className="lead text-body-secondary mx-auto mobile-lead-text" style={{ maxWidth: '800px' }}>
                        Todo lo que necesitas para tu casa, revisado a fondo y con la garantía de Juan Vicente.
                    </p>
                </div>

                {/* Filters and Search Section */}
                <div className="row justify-content-center mb-4 mb-md-5">
                    <div className="col-12 col-md-8 col-lg-6 mb-3">
                        <div className="position-relative">
                            <span className="position-absolute top-50 translate-middle-y ms-3 text-body-secondary">
                                <Search size={20} />
                            </span>
                            <input 
                                type="text" 
                                className="form-control form-control-lg rounded-pill ps-5 bg-body text-body border-secondary-subtle focus-ring" 
                                placeholder="Buscar electrodomésticos..." 
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

                {filteredItems.length === 0 ? (
                    <div className="text-center p-4 p-md-5 bg-body-tertiary rounded-4 shadow-sm border border-secondary-subtle" style={{ borderWidth: '2px' }}>
                        <p className="lead mb-0 text-body-secondary">
                            {electrodomesticos.length === 0 
                                ? "Actualmente no hay electrodomésticos disponibles en el catálogo. ¡Vuelve pronto!"
                                : "No se encontraron electrodomésticos con esos filtros."
                            }
                        </p>
                    </div>
                ) : (
                    <div className="row g-2 g-md-4 justify-content-center">
                        {filteredItems.map((item) => (
                            <div className="col-6 col-md-6 col-lg-4" key={item.id}>
                                <div className="card h-100 shadow-sm rounded-4 p-2 p-md-4 bg-body border border-secondary-subtle d-flex flex-column border-mobile-1" style={{ borderWidth: '2px' }}>
                                    <h3 className="h6 h4-md fw-bold text-primary mb-2 mb-md-3 text-truncate">{item.nombre}</h3>
                                    {/* React no tiene Str::limit nativo, recortamos el texto manual */}
                                    <p className="text-body-secondary flex-grow-1 mb-2 mb-md-4 small mobile-lead-text d-none d-sm-block">
                                        {item.descripcion.length > 80 
                                            ? `${item.descripcion.substring(0, 80)}...` 
                                            : item.descripcion}
                                    </p>
                                    <p className="text-body-secondary flex-grow-1 mb-2 small d-block d-sm-none" style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>
                                        {item.descripcion.length > 40 
                                            ? `${item.descripcion.substring(0, 40)}...` 
                                            : item.descripcion}
                                    </p>
                                    <div className="d-flex flex-column flex-xxl-row justify-content-between align-items-start align-items-xxl-center mt-auto pt-2 pt-md-3 border-top border-secondary-subtle gap-2">
                                        <span className="fs-6 fs-md-5 fw-bolder text-body">${parseFloat(item.precio).toFixed(2)}</span>
                                        <button 
                                            onClick={() => setSelectedItem(item)}
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
                                    <span className={`badge fs-6 ${selectedItem.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                                        {selectedItem.stock > 0 ? `En Stock: ${selectedItem.stock} disponibles` : 'Agotado'}
                                    </span>
                                </div>

                                {selectedItem.marca && (
                                    <p className="mb-1 small text-body-secondary">
                                        <strong>Marca:</strong> {selectedItem.marca}
                                        {selectedItem.modelo && <> &middot; <strong>Modelo:</strong> {selectedItem.modelo}</>}
                                    </p>
                                )}
                                {selectedItem.eficiencia_energetica && (
                                    <p className="mb-3 small text-body-secondary">
                                        <strong>Eficiencia:</strong> {selectedItem.eficiencia_energetica}
                                    </p>
                                )}

                                <p className="fs-6 lh-base mb-4 text-body mt-3">
                                    {selectedItem.descripcion || 'No hay descripción disponible para este producto.'}
                                </p>

                                <div className="d-flex justify-content-between align-items-center pt-3 border-top border-secondary-subtle mt-auto">
                                    <p className="fs-2 fw-bold mb-0 text-body">
                                        ${parseFloat(selectedItem.precio).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </MainLayout>
    );
}
