import React from 'react';
import { Link, Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, HeartHandshake, PackageSearch, Wrench, ChevronRight } from 'lucide-react';
import MainLayout from '../Layouts/MainLayout';
import AuroraBackground from '../Components/Backgrounds/AuroraBackground';
import LightRays from '../Components/Backgrounds/LightRays';
import { useLanguage } from '../Contexts/LanguageContext';

export default function Home() {
    // Variantes de animaciones para Framer Motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    // Variantes para que el texto salga por detrás de la imagen
    const textSlideRight = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 25, delay: 0.2 } }
    };

    const textSlideLeft = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 25, delay: 0.2 } }
    };

    const imageFadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } }
    };

    const features = [
        {
            icon: <Wrench size={28} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />,
            title: "Servicio Técnico Elite",
            description: "Diagnóstico y resolución de averías con precisión quirúrgica. Garantizamos el funcionamiento óptimo de tus equipos."
        },
        {
            icon: <ShieldCheck size={28} className="text-emerald-400 group-hover:text-emerald-300 transition-colors" />,
            title: "Catálogo Premium",
            description: "Selección curada de electrodomésticos de la más alta gama, probados bajo los estándares más estrictos."
        },
        {
            icon: <HeartHandshake size={28} className="text-rose-400 group-hover:text-rose-300 transition-colors" />,
            title: "Soporte Inmediato",
            description: "Respuesta al instante. Sabemos que el tiempo es oro cuando se trata de la comodidad de tu hogar."
        }
    ];

    return (
        <MainLayout>
            <Head title="Inicio" />

            {/* Hero Section */}
            <div className="container-fluid py-4 py-md-5 min-vh-100 d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden" style={{ paddingTop: 'calc(60px + 1.5rem)' }}>
                {/* Fading Mask Wrapper for LightRays to avoid sharp bottom cuts */}
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
                    zIndex: 0
                }}>
                    <LightRays />
                </div>
                <motion.div
                    className="container text-center mt-4 mt-md-5 mb-4 mb-md-5"
                    style={{ position: 'relative', zIndex: 1 }}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants} className="badge bg-body-secondary text-body px-3 py-2 rounded-pill mb-4 fs-6 shadow-sm border border-secondary-subtle">
                        <span className="spinner-grow spinner-grow-sm text-primary me-2" role="status" aria-hidden="true"></span>
                        Innovación Constante en el Hogar
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1 
                        variants={itemVariants}
                        className="display-4 display-md-2 fw-bold mb-3 mb-md-4"
                    >
                        El Futuro de tu<br/>
                        <span className="text-primary">
                            Hogar Inteligente.
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p 
                        variants={itemVariants}
                        className="lead text-body-secondary mx-auto mb-5"
                        style={{ maxWidth: '800px' }}
                    >
                        Tecnología de élite, diseño impecable y un servicio técnico sin rival. Bienvenidos a la nueva era de los electrodomésticos con <span className="fw-semibold text-body">Electronia Unitron</span>.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div variants={itemVariants} className="d-flex flex-column flex-sm-row justify-content-center gap-3 px-3 px-sm-0">
                        <Link 
                            href="/electrodomesticos" 
                            className="btn btn-primary btn-lg rounded-pill px-4 px-md-5 py-3 shadow-sm d-flex align-items-center justify-content-center gap-2 w-100 w-sm-auto"
                        >
                            Explorar Catálogo <ChevronRight size={18} />
                        </Link>
                        
                        <Link 
                            href="/servicios" 
                            className="btn btn-outline-secondary btn-lg rounded-pill px-4 px-md-5 py-3 d-flex align-items-center justify-content-center gap-2 w-100 w-sm-auto"
                            style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
                        >
                            <Wrench size={18} /> Servicio Técnico
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* --- CONTENIDO PRINCIPAL CON FONDO DE AURORA --- */}
            <div className="position-relative w-100 overflow-hidden">
                
                {/* Background Integration (Ahora abarca todo este div gigante) */}
                <div 
                    className="position-absolute top-0 bottom-0 start-0 end-0"
                    style={{
                        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 100%)',
                        zIndex: 0
                    }}
                >
                    <AuroraBackground />
                </div>

                {/* Feature Cards Grid (Staggered Entry on Scroll) */}
                <section className="py-5 position-relative" style={{ zIndex: 1 }}>
                    <div className="container position-relative" style={{ zIndex: 1 }}>
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={containerVariants}
                        className="row g-4"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className="col-12 col-md-4"
                            >
                                <div className="card h-100 shadow rounded-4 p-4 text-center bg-body border border-secondary-subtle" style={{ borderWidth: '2px' }}>
                                    <div className="card-body">
                                        <div className="d-inline-flex justify-content-center align-items-center bg-body-secondary rounded-circle shadow-sm mb-4" style={{ width: '60px', height: '60px' }}>
                                            {feature.icon}
                                        </div>
                                        <h3 className="h4 fw-bold mb-3">{feature.title}</h3>
                                        <p className="text-body-secondary mb-0">{feature.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>



                {/* NOSOTROS SECTION */}
                <div id="nosotros" className="container position-relative py-4 py-md-5 my-3 my-md-5" style={{ zIndex: 1 }}>
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={containerVariants}
                        className="text-center bg-body-tertiary bg-opacity-75 p-4 p-md-5 rounded-4 shadow-sm border border-secondary-subtle"
                        style={{ borderWidth: '2px', backdropFilter: 'blur(8px)' }}
                    >
                        <motion.div variants={itemVariants} className="d-inline-flex justify-content-center align-items-center bg-primary bg-opacity-10 text-primary rounded-circle mb-4" style={{ width: '80px', height: '80px' }}>
                            <HeartHandshake size={36} />
                        </motion.div>
                        <motion.h2 variants={itemVariants} className="display-5 fw-bold mb-4">Acerca de Electronia Unitron</motion.h2>
                        <motion.p variants={itemVariants} className="lead text-body-secondary mx-auto mb-4" style={{ maxWidth: '800px' }}>
                            Fundada con el objetivo de traer tecnología confiable a cada hogar, Electronia Unitron se ha consolidado como líder en la región
                            para la venta y reparación de línea blanca y línea marrón.
                        </motion.p>
                        <motion.p variants={itemVariants} className="lead text-body-secondary mx-auto mb-0" style={{ maxWidth: '800px' }}>
                            Nuestra filosofía se basa en la honestidad, transparencia y excelencia en cada diagnóstico y preventa de productos. 
                            Creemos en extender la vida útil de tus equipos o sustituirlos éticamente cuando realmente es necesario.
                        </motion.p>
                    </motion.div>


                    {/* Fila 1: Texto Izquierda, Gato Derecha */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={containerVariants}
                        className="row align-items-center my-5 py-2 py-md-5"
                    >
                        <motion.div variants={textSlideRight} className="col-12 col-md-6 mb-4 mb-md-0" style={{ zIndex: 0 }}>
                            <motion.div 
                                className="card shadow rounded-4 p-4 p-md-5 bg-body border border-secondary-subtle" 
                                style={{ borderWidth: '2px' }}
                                whileHover={{ scale: 1.02, y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="card-body">
                                    <h2 className="display-6 fw-bold mb-4 text-primary">Diseño Prémium</h2>
                                    <p className="lead text-body-secondary mb-0">
                                        Nuestros sistemas se adaptan a tu estilo de vida. Disfruta del máximo confort con un diseño de interfaz que respira elegancia y modernidad.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                        <motion.div variants={imageFadeIn} className="col-12 col-md-6 text-center" style={{ zIndex: 1 }}>
                            <motion.img 
                                src="https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg" 
                                alt="Cat api test 1" 
                                className="img-fluid rounded-4 shadow-lg border border-secondary-subtle" 
                                style={{ maxHeight: '350px', objectFit: 'cover', width: '100%', position: 'relative' }} 
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Fila 2: Gato Izquierda, Texto Derecha */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={containerVariants}
                        className="row align-items-center my-5 py-2 py-md-5"
                    >
                        <motion.div variants={imageFadeIn} className="col-12 col-md-6 order-2 order-md-1 mt-4 mt-md-0 text-center" style={{ zIndex: 1 }}>
                            <motion.img 
                                src="https://cdn2.thecatapi.com/images/3bd.jpg" 
                                alt="Cat api test 2" 
                                className="img-fluid rounded-4 shadow-lg border border-secondary-subtle" 
                                style={{ maxHeight: '350px', objectFit: 'cover', width: '100%', position: 'relative' }} 
                                whileHover={{ scale: 1.05, rotate: -2 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                        </motion.div>
                        <motion.div variants={textSlideLeft} className="col-12 col-md-6 order-1 order-md-2" style={{ zIndex: 0 }}>
                            <motion.div 
                                className="card shadow rounded-4 p-4 p-md-5 bg-body border border-secondary-subtle" 
                                style={{ borderWidth: '2px' }}
                                whileHover={{ scale: 1.02, y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="card-body">
                                    <h2 className="display-6 fw-bold mb-4 text-primary">Card Bonita & Espacios</h2>
                                    <p className="lead text-body-secondary mb-0">
                                        Hemos dejado mayor margen entre las distintas secciones para que el diseño respire. Estas "cards bonitas" ahora son sólidas y perfectamente uniformes.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Mapa de ubicación */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={itemVariants}
                        className="mt-4 mt-md-5 rounded-4 overflow-hidden shadow-lg border border-secondary-subtle"
                        style={{ borderWidth: '2px' }}
                    >
                        <iframe
                            title="Ubicación Electronica Unitron"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3082.9858137637557!2d-2.4320004!3d39.401827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd67d65cd8966b53%3A0x4a8ec00ee6cfe88f!2sElectronica%20Unitron!5e0!3m2!1ses!2ses!4v1710000000000!5m2!1ses!2ses"
                            width="100%"
                            height="400"
                            style={{ border: 0, display: 'block' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </motion.div>

                </div>

                <div id="contacto" className="container position-relative pt-4 pb-5 mt-4 mb-5" style={{ zIndex: 1 }}>
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={containerVariants}
                        className="d-flex flex-column align-items-center bg-body-tertiary bg-opacity-75 p-4 p-md-5 rounded-4 shadow-sm border border-secondary-subtle"
                        style={{ borderWidth: '2px', backdropFilter: 'blur(8px)' }}
                    >
                        <motion.h2 variants={itemVariants} className="display-5 fw-bold mb-2 text-center">Contáctanos</motion.h2>
                        <motion.p variants={itemVariants} className="text-body-secondary text-center mb-5">Estamos aquí para resolver tus problemas al instante.</motion.p>
                        
                        <motion.form 
                            variants={itemVariants}
                            className="w-100"
                            style={{ maxWidth: '600px' }}
                            onSubmit={(e) => { e.preventDefault(); alert("¡Formulario de prueba enviado!"); }}
                        >
                            <div className="mb-4">
                                <label className="form-label text-body-secondary fw-semibold">Nombre Completo</label>
                                <input type="text" className="form-control form-control-lg bg-body text-body border-secondary" placeholder="Ej. Juan Pérez" required />
                            </div>
                            <div className="mb-4">
                                <label className="form-label text-body-secondary fw-semibold">Correo Electrónico</label>
                                <input type="email" className="form-control form-control-lg bg-body text-body border-secondary" placeholder="juan@ejemplo.com" required />
                            </div>
                            <div className="mb-4">
                                <label className="form-label text-body-secondary fw-semibold">Mensaje o Tipo de avería</label>
                                <textarea rows="5" className="form-control form-control-lg bg-body text-body border-secondary" placeholder="Describe tu problema con detalle..." required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill shadow-sm py-3 mt-2 fw-bold">Enviar Solicitud</button>
                        </motion.form>
                    </motion.div>
                </div>
                </section>
            </div>
        </MainLayout>
    );
}
