import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Moon, Sun, Type, Globe, Cookie, X, User, UserPlus, LogOut } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { useTheme } from '../Contexts/ThemeContext';
import { useLanguage } from '../Contexts/LanguageContext';
import CookieBanner from './CookieBanner';

export default function FloatingWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode, toggleDarkMode, accentColor, changeAccentColor } = useTheme();
    const { language, toggleLanguage, t } = useLanguage();
    const auth = usePage()?.props?.auth || {};
    const [fontSize, setFontSize] = useState('normal'); 
    const [showCookies, setShowCookies] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const toggleFontSize = () => {
        if (fontSize === 'normal') {
            document.documentElement.style.fontSize = '120%';
            setFontSize('large');
        } else {
            document.documentElement.style.fontSize = '100%';
            setFontSize('normal');
        }
    };

    const handleCookies = () => {
        setIsOpen(false);
        setShowCookies(true);
    };

    // Animación para el menú
    const menuVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } },
        exit: { opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.2 } }
    };

    return (
        <div className="position-fixed bottom-0 end-0 p-4" style={{ zIndex: 1050 }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={`d-flex flex-column gap-2 mb-3 p-2 rounded-4 shadow-lg border ${isDarkMode ? 'bg-dark border-secondary' : 'bg-white border-light'}`}
                        style={{ width: '220px' }}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                            visible: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                        }}
                    >
                        {/* Theme Toggle */}
                        <motion.button
                            variants={menuVariants}
                            onClick={toggleDarkMode}
                            whileHover={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
                            className={`d-flex align-items-center gap-3 text-start border-0 bg-transparent p-2 rounded-3 w-100 ${isDarkMode ? 'text-light' : 'text-dark'}`}
                            title={isDarkMode ? t('acc.light_mode') : t('acc.dark_mode')}
                        >
                            {isDarkMode ? <Sun size={20} className="text-warning" /> : <Moon size={20} className="text-primary" />}
                            <span className="fw-semibold">{isDarkMode ? t('acc.light_mode') : t('acc.dark_mode')}</span>
                        </motion.button>

                        {/* Font Size */}
                        <motion.button
                            variants={menuVariants}
                            whileHover={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
                            className={`d-flex align-items-center gap-3 text-start border-0 bg-transparent p-2 rounded-3 w-100 ${isDarkMode ? 'text-light' : 'text-dark'}`}
                            title={t('acc.inc_font')}
                            onClick={toggleFontSize}
                        >
                            <Type size={20} className="text-success" />
                            <span className="fw-semibold">
                                {fontSize === 'normal' ? t('acc.inc_font') : t('acc.dec_font')}
                            </span>
                        </motion.button>

                        {/* Language */}
                        <motion.button
                            variants={menuVariants}
                            whileHover={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
                            className={`d-flex align-items-center gap-3 text-start border-0 bg-transparent p-2 rounded-3 w-100 ${isDarkMode ? 'text-light' : 'text-dark'}`}
                            title={t('acc.lang')}
                            onClick={toggleLanguage}
                        >
                            <Globe size={20} className="text-info" />
                            <span className="fw-semibold">{t('acc.lang')} ({language})</span>
                        </motion.button>

                        {/* Cookies */}
                        <motion.button
                            variants={menuVariants}
                            whileHover={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
                            className={`d-flex align-items-center gap-3 text-start border-0 bg-transparent p-2 rounded-3 w-100 ${isDarkMode ? 'text-light' : 'text-dark'}`}
                            title={t('acc.cookies')}
                            onClick={handleCookies}
                        >
                            <Cookie size={20} className="text-danger" />
                            <span className="fw-semibold">{t('acc.cookies')}</span>
                        </motion.button>
                        
                        {/* Auth Links */}
                        <motion.div variants={menuVariants}>
                            <hr className={`my-1 ${isDarkMode ? 'border-secondary' : 'border-light-subtle'}`} />
                            {auth.user ? (
                                <>
                            {auth.user?.is_admin && (
                                <Link 
                                    href={route('admin.dashboard')}
                                    className={`d-flex align-items-center gap-3 text-start border-0 bg-transparent p-2 rounded-3 w-100 text-decoration-none ${isDarkMode ? 'text-light' : 'text-dark'}`}
                                    title={t('nav.admin')}
                                >
                                    <Settings size={20} className="text-secondary" />
                                    <span className="fw-semibold">{t('nav.admin')}</span>
                                </Link>
                            )}
                                    <Link 
                                        href={route('logout')} 
                                        method="post" 
                                        as="button"
                                        className={`d-flex align-items-center gap-3 text-start border-0 bg-transparent p-2 rounded-3 w-100 ${isDarkMode ? 'text-light' : 'text-dark'}`}
                                        title="Cerrar Sesión"
                                    >
                                        <LogOut size={20} className="text-warning" />
                                        <span className="fw-semibold">Cerrar Sesión</span>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link 
                                        href={route('login')}
                                        className={`d-flex align-items-center gap-3 text-start border-0 bg-transparent p-2 rounded-3 w-100 text-decoration-none ${isDarkMode ? 'text-light' : 'text-dark'}`}
                                        title={t('auth.login')}
                                    >
                                        <User size={20} className="text-secondary" />
                                        <span className="fw-semibold">{t('auth.login')}</span>
                                    </Link>
                                    <Link 
                                        href={route('register')}
                                        className={`d-flex align-items-center gap-3 text-start border-0 bg-transparent p-2 rounded-3 w-100 text-decoration-none ${isDarkMode ? 'text-light' : 'text-dark'}`}
                                        title="Crear Cuenta"
                                    >
                                        <UserPlus size={20} className="text-success" />
                                        <span className="fw-semibold">Crear Cuenta</span>
                                    </Link>
                                </>
                            )}
                        </motion.div>

                        {/* Accent Color Picker */}
                        <motion.div variants={menuVariants} className="d-flex justify-content-between align-items-center mt-1 px-2 pb-1 border-top border-secondary-subtle pt-2">
                            <span className={`fw-semibold small ${isDarkMode ? 'text-light' : 'text-dark'}`}>Tema:</span>
                            <div className="d-flex gap-2">
                                <button
                                    onClick={() => changeAccentColor('red')}
                                    className="btn rounded-circle p-0"
                                    style={{ width: '22px', height: '22px', backgroundColor: '#dc3545', border: accentColor === 'red' ? '2px solid white' : '2px solid transparent', boxShadow: accentColor === 'red' ? '0 0 0 2px #dc3545' : 'none' }}
                                    title="Rojo"
                                />
                                <button
                                    onClick={() => changeAccentColor('green')}
                                    className="btn rounded-circle p-0"
                                    style={{ width: '22px', height: '22px', backgroundColor: '#198754', border: accentColor === 'green' ? '2px solid white' : '2px solid transparent', boxShadow: accentColor === 'green' ? '0 0 0 2px #198754' : 'none' }}
                                    title="Verde"
                                />
                                <button
                                    onClick={() => changeAccentColor('blue')}
                                    className="btn rounded-circle p-0"
                                    style={{ width: '22px', height: '22px', backgroundColor: '#0d6efd', border: accentColor === 'blue' ? '2px solid white' : '2px solid transparent', boxShadow: accentColor === 'blue' ? '0 0 0 2px #0d6efd' : 'none' }}
                                    title="Azul"
                                />
                                <button
                                    onClick={() => changeAccentColor('purple')}
                                    className="btn rounded-circle p-0"
                                    style={{ width: '22px', height: '22px', backgroundColor: '#6f42c1', border: accentColor === 'purple' ? '2px solid white' : '2px solid transparent', boxShadow: accentColor === 'purple' ? '0 0 0 2px #6f42c1' : 'none' }}
                                    title="Morado"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {showCookies && <CookieBanner forceShow={true} onClose={() => setShowCookies(false)} />}

            <div className="d-flex justify-content-end">
                <motion.button
                    onClick={toggleOpen}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary rounded-circle shadow d-flex align-items-center justify-content-center p-0"
                    style={{ width: '60px', height: '60px' }}
                >
                    {isOpen ? <X size={26} /> : <Settings size={26} />}
                </motion.button>
            </div>
        </div>
    );
}
