import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './AuroraBackground.css';

export default function AuroraBackground({ className = '' }) {
    return (
        <div className={`aurora-bg-container ${className}`}>
            <div className="aurora-blob aurora-blob-1"></div>
            <div className="aurora-blob aurora-blob-2"></div>
            <div className="aurora-blob aurora-blob-3"></div>
            <div className="aurora-blob aurora-blob-4"></div>
        </div>
    );
}
