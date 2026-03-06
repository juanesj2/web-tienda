import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // Initial theme check: localStorage or system preference
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return savedTheme === 'dark';
            }
            // Forzar por defecto que sea el tema oscuro siempre para nuevos usuarios
            return true;
        }
        return true;
    });

    const [accentColor, setAccentColor] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('accentColor') || 'blue';
        }
        return 'blue';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.setAttribute('data-bs-theme', 'dark');
            root.classList.add('dark'); // Keep this just in case any custom css still uses it
            localStorage.setItem('theme', 'dark');
        } else {
            root.setAttribute('data-bs-theme', 'light');
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    useEffect(() => {
        const root = window.document.documentElement;
        let hex = '#0d6efd';
        let rgb = '13, 110, 253';
        
        let hoverHex = '#0b5ed7';

        switch (accentColor) {
            case 'red':
                hex = '#dc3545';
                rgb = '220, 53, 69';
                hoverHex = '#bb2d3b';
                break;
            case 'green':
                hex = '#198754';
                rgb = '25, 135, 84';
                hoverHex = '#157347';
                break;
            case 'purple':
                hex = '#6f42c1';
                rgb = '111, 66, 193';
                hoverHex = '#59359a';
                break;
            case 'blue':
            default:
                hex = '#0d6efd';
                rgb = '13, 110, 253';
                hoverHex = '#0b5ed7';
                break;
        }

        // Sobreescribir variables CSS globales principales
        root.style.setProperty('--bs-primary', hex);
        root.style.setProperty('--bs-primary-rgb', rgb);
        root.style.setProperty('--bs-link-color', hex);
        root.style.setProperty('--bs-link-hover-color', hoverHex);
        root.style.setProperty('--accent', hex);

        // Crear o actualizar una etiqueta de estilo dinámica para sobrescribir las clases estáticas de Bootstrap (SCSS compiled)
        let styleTag = document.getElementById('dynamic-theme-styles');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'dynamic-theme-styles';
            document.head.appendChild(styleTag);
        }

        styleTag.innerHTML = `
            .text-primary { 
                color: rgba(${rgb}, var(--bs-text-opacity, 1)) !important; 
            }
            .bg-primary { 
                background-color: rgba(${rgb}, var(--bs-bg-opacity, 1)) !important; 
            }
            
            .btn-primary {
                --bs-btn-bg: ${hex};
                --bs-btn-border-color: ${hex};
                --bs-btn-hover-bg: ${hoverHex};
                --bs-btn-hover-border-color: ${hoverHex};
                --bs-btn-active-bg: ${hoverHex};
                --bs-btn-active-border-color: ${hoverHex};
                background-color: var(--bs-btn-bg);
                border-color: var(--bs-btn-border-color);
            }
            .btn-primary:hover, .btn-primary:focus {
                background-color: var(--bs-btn-hover-bg) !important;
                border-color: var(--bs-btn-hover-border-color) !important;
            }
            .btn-primary:active, .btn-primary.active {
                background-color: var(--bs-btn-active-bg) !important;
                border-color: var(--bs-btn-active-border-color) !important;
            }

            .btn-outline-primary {
                --bs-btn-color: ${hex};
                --bs-btn-border-color: ${hex};
                --bs-btn-hover-bg: ${hex};
                --bs-btn-hover-border-color: ${hex};
                --bs-btn-active-bg: ${hex};
                --bs-btn-active-border-color: ${hex};
                color: var(--bs-btn-color);
                border-color: var(--bs-btn-border-color);
            }
            .btn-outline-primary:hover, .btn-outline-primary:focus, .btn-outline-primary:active, .btn-outline-primary.active {
                background-color: var(--bs-btn-hover-bg) !important;
                border-color: var(--bs-btn-hover-border-color) !important;
                color: #fff !important;
            }
        `;
        
        localStorage.setItem('accentColor', accentColor);
    }, [accentColor]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const changeAccentColor = (color) => {
        setAccentColor(color);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, accentColor, changeAccentColor }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
