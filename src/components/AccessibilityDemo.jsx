import React, { useEffect } from 'react';
import { Eye, Volume2, Type, Keyboard, HelpCircle } from 'lucide-react';

export default function AccessibilityDemo({ 
  fontScale, 
  setFontScale, 
  daltonism, 
  setDaltonism, 
  screenReader, 
  setScreenReader 
}) {
  
  // Update HTML root font scale variable
  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', fontScale);
  }, [fontScale]);

  // Update body class for daltonism filters
  useEffect(() => {
    const body = document.body;
    body.classList.remove('deuteranopia', 'protanopia', 'tritanopia');
    if (daltonism !== 'none') {
      body.classList.add(daltonism);
    }
  }, [daltonism]);

  // Quick SpeechSynthesis test
  const testSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('Simulador de lector de pantalla activado. Pasa el cursor sobre los elementos del sitio.');
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Tu navegador no soporta síntesis de voz.');
    }
  };

  return (
    <div className="a11y-widget">
      <div className="a11y-widget-title">
        <Eye size={20} />
        <h4>Asistente y Demostración de Accesibilidad Interactiva</h4>
      </div>
      
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
        La <strong>accesibilidad</strong> elimina las barreras de navegación. Activa estas utilidades para experimentar cómo navegan los usuarios con capacidades diversas.
      </p>

      <div className="a11y-controls-grid">
        {/* Font Scale control */}
        <div className="a11y-control-group">
          <label htmlFor="font-scale-slider">
            <span><Type size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} /> Tamaño del Texto</span>
            <strong>{Math.round(fontScale * 100)}%</strong>
          </label>
          <input 
            id="font-scale-slider"
            type="range" 
            min="0.8" 
            max="1.5" 
            step="0.05" 
            value={fontScale} 
            onChange={(e) => setFontScale(parseFloat(e.target.value))}
            className="slider-control"
            aria-label="Ajustar tamaño de letra de la página"
          />
        </div>

        {/* Daltonism simulation */}
        <div className="a11y-control-group">
          <label htmlFor="daltonism-select">
            <span><Eye size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} /> Simulador de Daltonismo</span>
          </label>
          <select 
            id="daltonism-select"
            value={daltonism} 
            onChange={(e) => setDaltonism(e.target.value)}
            className="select-control"
            aria-label="Seleccionar filtro de simulación de daltonismo"
          >
            <option value="none">Ninguno (Normal)</option>
            <option value="deuteranopia">Deuteranopía (Sin verde)</option>
            <option value="protanopia">Protanopía (Sin rojo)</option>
            <option value="tritanopia">Tritanopía (Sin azul)</option>
          </select>
        </div>

        {/* Screen Reader simulator */}
        <div className="a11y-control-group">
          <label>
            <span><Volume2 size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} /> Lector de Pantalla Simulado</span>
            <span style={{ fontSize: '0.75rem', color: screenReader ? 'var(--secondary)' : 'var(--text-muted)' }}>
              {screenReader ? 'Activado' : 'Desactivado'}
            </span>
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => {
                const nextState = !screenReader;
                setScreenReader(nextState);
                if (nextState) {
                  setTimeout(testSpeech, 100);
                } else {
                  window.speechSynthesis?.cancel();
                }
              }} 
              className={`btn ${screenReader ? 'btn-success' : 'btn-secondary'}`}
              style={{ flexGrow: 1, padding: '0.4rem' }}
              aria-pressed={screenReader}
            >
              {screenReader ? 'Desactivar Lector' : 'Activar Lector'}
            </button>
          </div>
        </div>
      </div>

      {screenReader && (
        <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(var(--primary-rgb), 0.04)', fontSize: '0.8rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Keyboard size={16} />
          <span>
            <strong>Lector de pantalla activo:</strong> Pasa el mouse sobre el texto o los botones para que el sistema lea en voz alta el contenido y la información semántica del sitio.
          </span>
        </div>
      )}

      {daltonism !== 'none' && (
        <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(245, 158, 11, 0.08)', fontSize: '0.8rem', color: 'var(--accent-hover)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <HelpCircle size={16} />
          <span>
            <strong>Simulación visual activa:</strong> Estás viendo el sitio web como una persona con dificultades de percepción de color. Comprueba si los botones e información se siguen distinguiendo a pesar del cambio.
          </span>
        </div>
      )}
    </div>
  );
}
