import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ThemeProvider } from './Contexts/ThemeContext';
import { LanguageProvider } from './Contexts/LanguageContext';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Electronia Unitron';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <ThemeProvider>
                <LanguageProvider>
                    <App {...props} />
                </LanguageProvider>
            </ThemeProvider>
        );
    },
    progress: {
        color: '#3b82f6', // El color principal (accent) de Electronia Unitron
        showSpinner: true,
    },
});
