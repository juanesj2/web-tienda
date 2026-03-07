import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Testimonios() {
    const [testimonios, setTestimonios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('/api/reviews');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.reviews && data.reviews.length > 0) {
                        // Map Google reviews to our format
                        const mappedReviews = data.reviews.map((rev, index) => ({
                            id: index,
                            name: rev.author_name,
                            date: rev.relative_time_description,
                            text: rev.text,
                            avatar: rev.profile_photo_url || rev.author_name.charAt(0).toUpperCase(),
                            color: ["bg-primary", "bg-success", "bg-info", "bg-warning", "bg-danger"][index % 5]
                        }));
                        setTestimonios(mappedReviews);
                    }
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    // Si carga y no hay testimonios (fallan hasta los falsos), no renderizar la caja
    if (!loading && testimonios.length === 0) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="container position-relative py-3 py-md-5 my-3 my-md-5 px-3 px-md-auto" style={{ zIndex: 1 }}>
            <div className="text-center mb-4 mb-md-5">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="badge bg-body-secondary text-body px-3 py-2 rounded-pill mb-3"
                >
                    ⭐⭐⭐⭐⭐ Reseñas Reales
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="display-6 fw-bold text-primary mobile-h2"
                >
                    Lo que dicen nuestros vecinos
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="lead text-body-secondary mx-auto mobile-lead-text" 
                    style={{ maxWidth: '600px' }}
                >
                    Opiniones de clientes que han confiado en el servicio técnico y la tienda de Juan Vicente. Sus palabras son nuestra mejor garantía.
                </motion.p>
            </div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="row g-4 justify-content-center"
            >
                {testimonios.map((testimonio) => (
                    <motion.div key={testimonio.id} variants={itemVariants} className="col-12 col-md-4">
                        <div className="card h-100 shadow-sm rounded-4 border-0 bg-body-tertiary">
                            <div className="card-body p-4 p-md-5 d-flex flex-column">
                                <div className="d-flex align-items-center mb-3">
                                    {testimonio.avatar && testimonio.avatar.startsWith('http') ? (
                                        <img src={testimonio.avatar} alt={testimonio.name} className="rounded-circle me-3 border border-secondary" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                    ) : (
                                        <div className={`text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-5 me-3 ${testimonio.color}`} style={{ width: '50px', height: '50px' }}>
                                            {testimonio.avatar}
                                        </div>
                                    )}
                                    <div>
                                        <h5 className="mb-0 fw-bold fs-6">{testimonio.name}</h5>
                                        <div className="d-flex text-warning fs-6">
                                            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-body-secondary fst-italic flex-grow-1 mb-0 fs-6" style={{ lineHeight: '1.6' }}>
                                    "{testimonio.text}"
                                </p>
                                <div className="mt-3 text-end">
                                    <small className="text-muted d-flex align-items-center justify-content-end gap-1">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" width="14" height="14" />
                                        {testimonio.date}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-5"
            >
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary rounded-pill px-4 fw-bold">
                    Ver más reseñas en Google
                </a>
            </motion.div>
        </div>
    );
}
