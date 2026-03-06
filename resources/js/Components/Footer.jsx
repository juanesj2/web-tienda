import React from 'react';
import { Link } from '@inertiajs/react';
import { useLanguage } from '../Contexts/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer bg-body-tertiary text-body-secondary py-5 border-top border-secondary-subtle position-relative" style={{ zIndex: 10 }}>
            <div className="container">
                <div className="row justify-content-between gy-4">
                    {/* Brand Info */}
                    <div className="col-12 col-lg-4 text-center text-lg-start">
                        <Link href="/" className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 mb-3 text-decoration-none">
                            <img src="https://flowbite.com/docs/images/logo.svg" height="32" alt="Electronia Logo" />
                            <span className="fs-4 fw-bold text-body">Electronia Unitron</span>
                        </Link>
                        <p className="mb-4 mx-auto mx-lg-0" style={{ maxWidth: '400px' }}>
                            Innovación constante en el hogar. Líderes en venta y reparación de línea blanca y línea marrón con un servicio técnico de élite inigualable.
                        </p>
                        <div className="d-flex justify-content-center justify-content-lg-start gap-3">
                            {/* Social Placeholders */}
                            <a href="#" className="text-body-secondary text-primary-hover"><i className="bi bi-facebook fs-5"></i></a>
                            <a href="#" className="text-body-secondary text-primary-hover"><i className="bi bi-twitter fs-5"></i></a>
                            <a href="#" className="text-body-secondary text-primary-hover"><i className="bi bi-instagram fs-5"></i></a>
                            <a href="#" className="text-body-secondary text-primary-hover"><i className="bi bi-linkedin fs-5"></i></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-12 col-md-4 col-lg-2 text-center text-lg-start">
                        <h5 className="text-body fw-bold mb-3">Secciones</h5>
                        <ul className="list-unstyled d-flex flex-column gap-2">
                            <li><Link href="/" className="text-decoration-none text-body-secondary text-primary-hover">{t('nav.home')}</Link></li>
                            <li><Link href="/#nosotros" className="text-decoration-none text-body-secondary text-primary-hover">{t('nav.about')}</Link></li>
                            <li><Link href="/servicios" className="text-decoration-none text-body-secondary text-primary-hover">{t('nav.services')}</Link></li>
                            <li><Link href="/electrodomesticos" className="text-decoration-none text-body-secondary text-primary-hover">{t('nav.pricing')}</Link></li>
                            <li><Link href="/#contacto" className="text-decoration-none text-body-secondary text-primary-hover">{t('nav.contact')}</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-12 col-md-8 col-lg-4 text-center text-lg-start">
                        <h5 className="text-body fw-bold mb-3">Contacto</h5>
                        <ul className="list-unstyled d-flex flex-column gap-3">
                            <li className="d-flex gap-3 align-items-start justify-content-center justify-content-lg-start">
                                <i className="bi bi-geo-alt-fill text-primary mt-1"></i>
                                <span>123 Avenida de la Innovación, Parque Tecnológico,<br/> Ciudad Metropolitana, 28000</span>
                            </li>
                            <li className="d-flex gap-3 align-items-center justify-content-center justify-content-lg-start">
                                <i className="bi bi-envelope-fill text-primary"></i>
                                <a href="mailto:soporte@electroniaunitron.com" className="text-decoration-none text-body-secondary text-primary-hover">soporte@electroniaunitron.com</a>
                            </li>
                            <li className="d-flex gap-3 align-items-center justify-content-center justify-content-lg-start">
                                <i className="bi bi-telephone-fill text-primary"></i>
                                <span>+34 900 123 456 (Asistencia 24/7)</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="my-4 border-secondary opacity-25" />

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                    <p className="mb-0 small text-center text-md-start">
                        &copy; {currentYear} Electronia Unitron. Todos los derechos reservados. Web creada con MUCHO amor por <a href="https://github.com/juanesj2">juanesj2 😎</a>
                    </p>
                    <div className="d-flex gap-3 small">
                        <a href="#" className="text-decoration-none text-body-secondary text-primary-hover">Política de Privacidad</a>
                        <a href="#" className="text-decoration-none text-body-secondary text-primary-hover">Términos de Servicio</a>
                        <a href="#" className="text-decoration-none text-body-secondary text-primary-hover">Aviso Legal</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
