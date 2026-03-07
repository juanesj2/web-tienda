import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Wrench, ThermometerSnowflake, Droplets } from 'lucide-react';

export default function ConsejosManitas() {
    const tips = [
        {
            icon: <Droplets size={24} className="text-info" />,
            title: "La lavadora huele a humedad",
            desc: "Deja siempre la puerta entreabierta después de cada lavado y limpia la goma de la escotilla con un paño cada mes. ¡Evitarás moho y malos olores!"
        },
        {
            icon: <ThermometerSnowflake size={24} className="text-primary" />,
            title: "El frigo hace mucha escarcha",
            desc: "Comprueba que la puerta cierra herméticamente y no la dejes abierta mucho rato. Si sigue pasando, la resistencia de desescarche podría estar fallando."
        },
        {
            icon: <Wrench size={24} className="text-secondary" />,
            title: "Mantenimiento del lavavajillas",
            desc: "Usa un limpialavavajillas una vez al mes con el aparato vacío y a máxima temperatura. Y no olvides rellenar la sal, es vital en nuestra zona por la cal del agua."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div id="consejos" className="container position-relative py-3 py-md-5 my-3 my-md-5 px-3 px-md-auto" style={{ zIndex: 1 }}>
            <div className="row align-items-center">
                <div className="col-12 col-lg-4 mb-4 mb-lg-0 text-center text-lg-start">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="d-inline-flex justify-content-center align-items-center bg-warning bg-opacity-10 text-warning rounded-circle mb-3 border border-warning border-opacity-25 shadow-sm" style={{ width: '60px', height: '60px' }}>
                            <Lightbulb size={28} />
                        </div>
                        <h2 className="display-6 fw-bold mb-3 mobile-h2">Los Consejos del Manitas</h2>
                        <p className="lead text-body-secondary mb-4 mobile-lead-text">
                            No todo necesita reparación. Evita averías costosas siguiendo estos sencillos trucos de mantenimiento que Juan Vicente suele recomendar a todos los vecinos.
                        </p>
                    </motion.div>
                </div>
                
                <div className="col-12 col-lg-8">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="row g-3"
                    >
                        {tips.map((tip, index) => (
                            <motion.div key={index} variants={itemVariants} className="col-12 col-md-4">
                                <div className="card h-100 shadow-sm border-0 bg-body-tertiary rounded-4 card-mobile-p">
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            {tip.icon}
                                        </div>
                                        <h5 className="fw-bold fs-6 mb-2">{tip.title}</h5>
                                        <p className="text-body-secondary small mb-0" style={{ lineHeight: '1.5' }}>
                                            {tip.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
