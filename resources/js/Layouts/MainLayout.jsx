import React, { useState, useEffect } from "react";
import { Link, usePage, Head } from "@inertiajs/react";
import { ThemeProvider, useTheme } from "../Contexts/ThemeContext";
import { LanguageProvider, useLanguage } from "../Contexts/LanguageContext";
import FloatingWidget from "../Components/FloatingWidget";
import CookieBanner from "../Components/CookieBanner";
import WhatsAppButton from "../Components/WhatsAppButton";
import Footer from "../Components/Footer";

export default function MainLayout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t } = useLanguage();
    const { isDarkMode } = useTheme();
    const { props } = usePage();
    const auth = props?.auth || {};
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    const navItems = [
        { name: t('nav.home'), path: '/#' },
        { name: t('nav.about'), path: '/#nosotros' },
        { name: t('nav.contact'), path: '/#contacto' },
        { name: t('nav.services'), path: '/servicios' },
        { name: t('nav.pricing'), path: '/electrodomesticos' },
    ];

    return (
        <div className="min-vh-100 d-flex flex-column" style={{ transition: 'background-color 0.3s ease, color 0.3s ease' }}>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="description" content="Electrónica Unitron - Tu tienda de pueblo de confianza. Venta y reparación de toda clase de electrodomésticos con el trato personal de Juan Vicente." />
                    <meta name="author" content="Juan Vicente - Electrónica Unitron" />
                    <meta name="keywords" content="reparación, electrodomésticos, manitas, tienda local, venta, servicio técnico, lavadoras, frigoríficos, televisores, Unitron" />
                    
                    {/* Open Graph / Facebook */}
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Electrónica Unitron" />
                    <meta property="og:description" content="Venta y reparación de electrodomésticos. Soluciones honestas a precios justos para nuestro pueblo." />
                    <meta property="og:site_name" content="Electrónica Unitron" />
                    
                    {/* Twitter */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="Electrónica Unitron" />
                    <meta name="twitter:description" content="Venta y reparación de electrodomésticos. Tu tienda de confianza de toda la vida." />
                </Head>

                <nav className={`navbar navbar-expand-lg fixed-top border-bottom ${isDarkMode ? 'navbar-dark bg-dark border-secondary' : 'navbar-light bg-light border-light-subtle'}`} style={{ backdropFilter: 'blur(10px)', '--bs-bg-opacity': '.9' }}>
                    <div className="container">
                        <Link href="/" className="navbar-brand d-flex align-items-center gap-2">
                            <img src="https://flowbite.com/docs/images/logo.svg" height="30" alt="Electronia Logo" />
                            <strong className="d-none d-sm-inline">Electronia Unitron</strong>
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-expanded={isMobileMenuOpen}
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 column-gap-3">
                                {navItems.map((item) => (
                                    <li className="nav-item" key={item.name}>
                                        <a
                                            href={item.path}
                                            className={`nav-link rounded-pill px-3 ${item.path === '/#' ? 'active' : ''}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                                {auth.user?.is_admin && (
                                    <li className="nav-item">
                                        <Link
                                            href={route('admin.dashboard')}
                                            className="nav-link rounded-pill px-3"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {t('nav.admin')}
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>

                <main className="flex-grow-1 position-relative w-100 overflow-hidden">
                    {children}
                </main>

                <FloatingWidget />
                <WhatsAppButton />
                <CookieBanner />
                <Footer />
            </div>
    );
}

