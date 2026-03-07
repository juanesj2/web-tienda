import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner({ forceShow = false, onClose }) {
    const [isVisible, setIsVisible] = useState(false);
    const [preferences, setPreferences] = useState({
        necessary: true
    });

    useEffect(() => {
        // Solo mostramos el banner al cargar si no han aceptado antes
        if (!localStorage.getItem('cookies_accepted')) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        } else if (forceShow) {
            // Si forceShow es true (abierto desde accesibilidad), mostramos
            setIsVisible(true);
        }
    }, [forceShow]);

    const handleAcceptAll = () => {
        setPreferences({ necessary: true });
        saveAndClose();
    };

    const handleSavePreferences = () => {
        saveAndClose();
    };

    const saveAndClose = () => {
        localStorage.setItem('cookies_accepted', 'true');
        localStorage.setItem('cookie_preferences', JSON.stringify(preferences));
        setIsVisible(false);
        if (onClose) onClose();
    };

    const handleCloseModal = () => {
        setIsVisible(false);
        if (onClose) onClose();
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-end align-items-md-center z-3" style={{ zIndex: 1060, backgroundColor: 'rgba(0,0,0,0.5)', padding: '20px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white dark:bg-dark text-dark dark:text-light rounded-4 shadow-lg p-4 w-100"
                        style={{ maxWidth: '600px' }}
                    >
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="fw-bold mb-0">🍪 Preferencias de Cookies</h4>
                            <button onClick={handleCloseModal} className="btn-close" aria-label="Close"></button>
                        </div>
                        <p className="text-secondary">
                            En Electrónica Unitron no te espiamos. Solo guardamos una galletita (cookie) técnica en tu navegador para saber si has cerrado este aviso. No rastreamos tus datos ni usamos cookies de terceros.
                        </p>

                        <div className="d-flex flex-column gap-3 mb-4">
                            <div className="form-check form-switch d-flex justify-content-between">
                                <div>
                                    <label className="form-check-label fw-bold">Estrictamente Necesarias</label>
                                    <small className="d-block text-muted">La única cookie que usamos es para quitarte este cartelito molesto de en medio.</small>
                                </div>
                                <input className="form-check-input" type="checkbox" checked={true} disabled />
                            </div>
                        </div>

                        <div className="d-flex justify-content-end">
                            <button onClick={handleAcceptAll} className="btn btn-primary rounded-pill px-4">Vale, entiendo</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
