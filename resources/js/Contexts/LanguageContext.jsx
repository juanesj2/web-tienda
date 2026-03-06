import React, { createContext, useContext, useState, useEffect } from 'react';

// Diccionario de traducciones (simulado para las principales partes de la web)
const translations = {
    ES: {
        'nav.home': 'Inicio',
        'nav.about': 'Nosotros',
        'nav.services': 'Servicios',
        'nav.pricing': 'Electrodomésticos',
        'nav.contact': 'Contacto',
        'nav.admin': 'Panel de Control',
        'hero.badge': 'Innovación Constante en el Hogar',
        'hero.title1': 'El Futuro de tu',
        'hero.title2': 'Hogar Inteligente.',
        'hero.subtitle': 'Tecnología de élite, diseño impecable y un servicio técnico sin rival. Bienvenidos a la nueva era de los electrodomésticos con',
        'hero.btn.catalog': 'Explorar Catálogo',
        'hero.btn.service': 'Servicio Técnico',
        'acc.dark_mode': 'Modo Oscuro',
        'acc.light_mode': 'Modo Claro',
        'acc.inc_font': 'Aumentar Letra',
        'acc.dec_font': 'Letra Normal',
        'acc.lang': 'Idioma',
        'acc.cookies': 'Cookies',
        'auth.login': 'Iniciar Sesión',
        'auth.register': 'Crear Cuenta',
        'auth.email': 'Correo Electrónico',
        'auth.password': 'Contraseña',
        'auth.password_confirm': 'Confirmar Contraseña',
        'auth.name': 'Nombre Completo',
        'auth.remember': 'Recuérdame',
        'auth.no_account': '¿No tienes cuenta?',
        'auth.has_account': '¿Ya tienes cuenta?'
    },
    EN: {
        'nav.home': 'Home',
        'nav.about': 'About Us',
        'nav.services': 'Services',
        'nav.pricing': 'Appliances',
        'nav.contact': 'Contact',
        'nav.admin': 'Dashboard',
        'hero.badge': 'Constant Innovation at Home',
        'hero.title1': 'The Future of your',
        'hero.title2': 'Smart Home.',
        'hero.subtitle': 'Elite technology, flawless design, and unrivaled technical service. Welcome to the new era of home appliances with',
        'hero.btn.catalog': 'Explore Catalog',
        'hero.btn.service': 'Technical Service',
        'acc.dark_mode': 'Dark Mode',
        'acc.light_mode': 'Light Mode',
        'acc.inc_font': 'Increase Font',
        'acc.dec_font': 'Normal Font',
        'acc.lang': 'Language',
        'acc.cookies': 'Cookies',
        'auth.login': 'Log In',
        'auth.register': 'Create Account',
        'auth.email': 'Email Address',
        'auth.password': 'Password',
        'auth.password_confirm': 'Confirm Password',
        'auth.name': 'Full Name',
        'auth.remember': 'Remember Me',
        'auth.no_account': 'Don\'t have an account?',
        'auth.has_account': 'Already have an account?'
    }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('app_language') || 'ES';
        }
        return 'ES';
    });

    useEffect(() => {
        localStorage.setItem('app_language', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => (prev === 'ES' ? 'EN' : 'ES'));
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
