import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { useLanguage } from '../../Contexts/LanguageContext';
import { useTheme } from '../../Contexts/ThemeContext';

export default function Register() {
    const { t } = useLanguage();
    const { isDarkMode } = useTheme();
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <MainLayout>
            <Head title={t('auth.register')} />

            <div className="container min-vh-100 d-flex align-items-center justify-content-center pt-5 pb-5">
                <div 
                    className={`card shadow-lg border-0 rounded-4 w-100 ${isDarkMode ? 'bg-dark text-light border-secondary' : 'bg-white'}`} 
                    style={{ maxWidth: '500px', backdropFilter: 'blur(10px)', '--bs-bg-opacity': '.9' }}
                >
                    <div className="card-body p-5">
                        <div className="text-center mb-4">
                            <h2 className="fw-bold">{t('auth.register')}</h2>
                            <p className="text-muted">Crear nueva cuenta de administrador</p>
                        </div>

                        <form onSubmit={submit}>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">{t('auth.name')}</label>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg rounded-pill ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoFocus
                                />
                                {errors.name && <div className="text-danger mt-1 small ms-3">{errors.name}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">{t('auth.email')}</label>
                                <input
                                    type="email"
                                    className={`form-control form-control-lg rounded-pill ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && <div className="text-danger mt-1 small ms-3">{errors.email}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">{t('auth.password')}</label>
                                <input
                                    type="password"
                                    className={`form-control form-control-lg rounded-pill ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                {errors.password && <div className="text-danger mt-1 small ms-3">{errors.password}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold">{t('auth.password_confirm')}</label>
                                <input
                                    type="password"
                                    className={`form-control form-control-lg rounded-pill ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="d-grid mt-4">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-lg rounded-pill" 
                                    disabled={processing}
                                >
                                    {t('auth.register')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
