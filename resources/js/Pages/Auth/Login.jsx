import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { useLanguage } from '../../Contexts/LanguageContext';
import { useTheme } from '../../Contexts/ThemeContext';

export default function Login() {
    const { t } = useLanguage();
    const { isDarkMode } = useTheme();
    
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <MainLayout>
            <Head title={t('auth.login')} />

            <div className="container min-vh-100 d-flex align-items-center justify-content-center pt-5">
                <div 
                    className={`card shadow-lg border-0 rounded-4 w-100 ${isDarkMode ? 'bg-dark text-light border-secondary' : 'bg-white'}`} 
                    style={{ maxWidth: '450px', backdropFilter: 'blur(10px)', '--bs-bg-opacity': '.9' }}
                >
                    <div className="card-body p-5">
                        <div className="text-center mb-4">
                            <h2 className="fw-bold">{t('auth.login')}</h2>
                            <p className="text-muted">Panel de Administración de Electronia Unitron</p>
                        </div>

                        <form onSubmit={submit}>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">{t('auth.email')}</label>
                                <input
                                    type="email"
                                    className={`form-control form-control-lg rounded-pill ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoFocus
                                />
                                {errors.email && <div className="text-danger mt-1 small ms-3">{errors.email}</div>}
                            </div>

                            <div className="mb-4">
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

                            <div className="mb-4 form-check ms-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="remember_me"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <label className="form-check-label user-select-none" htmlFor="remember_me">
                                    {t('auth.remember')}
                                </label>
                            </div>

                            <div className="d-grid mt-4">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-lg rounded-pill" 
                                    disabled={processing}
                                >
                                    {t('auth.login')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
