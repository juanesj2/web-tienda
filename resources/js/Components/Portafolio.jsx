import React from 'react';
import { motion } from 'framer-motion';

export default function Portafolio({ trabajos }) {
    if (!trabajos || trabajos.length === 0) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div id="portafolio" className="container position-relative py-3 py-md-5 my-3 my-md-5 px-3 px-md-auto" style={{ zIndex: 1 }}>
            <div className="text-center mb-4 mb-md-5">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3 border border-primary border-opacity-25"
                >
                    🔧 Directo del Taller
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="display-6 fw-bold text-body mobile-h2"
                >
                    Últimas Reparaciones
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="lead text-body-secondary mx-auto mobile-lead-text" 
                    style={{ maxWidth: '700px' }}
                >
                    Un vistazo a los electrodomésticos a los que Juan Vicente les ha devuelto la vida recientemente. ¡No lo tires sin preguntar primero!
                </motion.p>
            </div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="row justify-content-center g-4"
            >
                {trabajos.map((trabajo) => (
                    <motion.div key={trabajo.id} variants={itemVariants} className="col-12 col-md-4">
                        <div className="card h-100 shadow-sm rounded-4 border border-secondary-subtle overflow-hidden card-mobile-p border-mobile-1 bg-body">
                            <div className="position-relative" style={{ height: '220px' }}>
                                <img 
                                    src={trabajo.imagen_url || 'https://images.unsplash.com/photo-1581092918056-0c4c3acd37be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
                                    alt={trabajo.titulo} 
                                    className="w-100 h-100 object-fit-cover"
                                />
                                {trabajo.coste_estimado && (
                                    <div className="position-absolute bottom-0 end-0 m-3 px-3 py-1 bg-success text-white rounded-pill fw-bold shadow-sm">
                                        Arreglo: {trabajo.coste_estimado}€
                                    </div>
                                )}
                            </div>
                            <div className="card-body p-4 d-flex flex-column">
                                <h4 className="card-title fw-bold h5 mb-3">{trabajo.titulo}</h4>
                                <p className="card-text text-body-secondary flex-grow-1 mb-0" style={{ fontSize: '0.95rem' }}>
                                    {trabajo.descripcion}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
