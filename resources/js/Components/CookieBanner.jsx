import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner({ forceShow = false, onClose }) {
    const [isVisible, setIsVisible] = useState(false);
    const [preferences, setPreferences] = useState({
        necessary: true, // Siempre true
        analytics: true,
        marketing: false
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
        setPreferences({ necessary: true, analytics: true, marketing: true });
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
                            Utilizamos cookies propias y de terceros para darte la mejor experiencia en Electronia Unitron. 
                            Puedes aceptar todas o configurar tus preferencias.
                        </p>

                        <div className="d-flex flex-column gap-3 mb-4">
                            <div className="form-check form-switch d-flex justify-content-between">
                                <div>
                                    <label className="form-check-label fw-bold">Estrictamente Necesarias</label>
                                    <small className="d-block text-muted">Aseguran el funcionamiento del sitio. No se pueden desactivar.</small>
                                </div>
                                <input className="form-check-input" type="checkbox" checked={true} disabled />
                            </div>
                            
                            <div className="form-check form-switch d-flex justify-content-between">
                                <div>
                                    <label className="form-check-label fw-bold">Analíticas</label>
                                    <small className="d-block text-muted">Nos ayudan a entender cómo usas nuestra web.</small>
                                </div>
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    checked={preferences.analytics} 
                                    onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                                />
                            </div>

                            <div className="form-check form-switch d-flex justify-content-between">
                                <div>
                                    <label className="form-check-label fw-bold">Marketing y Anuncios</label>
                                    <small className="d-block text-muted">Usadas para mostrarte anuncios relevantes.</small>
                                </div>
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    checked={preferences.marketing} 
                                    onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                                />
                            </div>
                        </div>

                        <div className="d-flex gap-2 justify-content-end">
                            <button onClick={handleSavePreferences} className="btn btn-outline-secondary rounded-pill px-4">Guardar</button>
                            <button onClick={handleAcceptAll} className="btn btn-primary rounded-pill px-4">Aceptar Todas</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
