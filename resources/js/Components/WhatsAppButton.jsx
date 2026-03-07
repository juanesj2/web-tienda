import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
    // Reemplaza esto con el número real de Juan Vicente
    const phoneNumber = "34600000000"; 
    const message = "Hola Juan Vicente, he visto tu web y necesito hacerte una consulta:";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="position-fixed"
            style={{
                bottom: '30px',
                left: '30px', // Movido a la izquierda para evitar el widget de ajustes
                zIndex: 1050,
                textDecoration: 'none'
            }}
            aria-label="Contactar por WhatsApp"
        >
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="rounded-circle shadow-lg d-flex justify-content-center align-items-center"
                style={{
                    backgroundColor: '#25D366', // Color oficial de WhatsApp
                    width: '60px',
                    height: '60px',
                    position: 'relative'
                }}
            >
                {/* Animación de "pulso" o latido detrás del botón */}
                <motion.div
                    animate={{
                        boxShadow: [
                            "0 0 0 0 rgba(37, 211, 102, 0.7)",
                            "0 0 0 20px rgba(37, 211, 102, 0)"
                        ]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop"
                    }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '50%',
                        zIndex: -1
                    }}
                />
                
                <MessageCircle size={32} color="white" fill="white" />
            </motion.div>
        </a>
    );
}
