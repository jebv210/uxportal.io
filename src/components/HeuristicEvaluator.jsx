import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Check, X, AlertTriangle, Eye, HelpCircle } from 'lucide-react';

export default function HeuristicEvaluator() {
  const [isOptimized, setIsOptimized] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error on change
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Submit action
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitMessage(null);

    if (!isOptimized) {
      // Bad form logic: confusing errors and raw alert
      if (!formData.name || !formData.email || !formData.password) {
        alert("ERROR 5028: PARAMS_MISSING. REINTENTAR.");
      } else {
        setSubmitMessage({ type: 'error', text: 'Error inesperado. Intente de nuevo.' });
      }
      return;
    }

    // Good form logic: clear validation and status feedback
    const errors = {};
    if (!formData.name) errors.name = 'El nombre completo es requerido para registrar tu usuario.';
    if (!formData.email) {
      errors.email = 'El correo electrónico es requerido.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Ingresa una dirección de correo válida (ej. usuario@manuela.edu.co).';
    }
    if (!formData.password) {
      errors.password = 'La contraseña es requerida.';
    } else if (formData.password.length < 6) {
      errors.password = 'Por seguridad, la contraseña debe tener al menos 6 caracteres.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API request (Visibility of system status)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage({ type: 'success', text: '¡Registro exitoso! Tus datos han sido procesados de manera segura.' });
      setFormData({ name: '', email: '', password: '' });
    }, 1500);
  };

  const handleCancel = () => {
    if (isOptimized) {
      if (window.confirm("¿Seguro que deseas cancelar? Se perderán los datos del formulario.")) {
        setFormData({ name: '', email: '', password: '' });
        setFormErrors({});
        setSubmitMessage(null);
      }
    } else {
      // Bad usability: just resets without asking or doesn't work correctly
      setFormData({ name: '', email: '', password: '' });
    }
  };

  return (
    <div className="glass-card" style={{ marginTop: '2rem' }}>
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <span className="hero-badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)', color: 'var(--accent)' }}>
          Evaluador de Heurísticas
        </span>
        <h3>Laboratorio de Rediseño Heurístico</h3>
        <p style={{ fontSize: '0.95rem' }}>
          Jakob Nielsen formuló 10 reglas heurísticas fundamentales para el diseño de interfaces. Observa un formulario con severas violaciones de diseño y aplícale las soluciones de usabilidad correspondientes.
        </p>
      </div>

      {/* Toggle Optimizer Switch */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '2rem', padding: '1rem', borderRadius: '0.75rem', backgroundColor: 'rgba(var(--primary-rgb), 0.04)', border: '1px solid var(--border-color)' }}>
        <span style={{ fontWeight: 700, color: !isOptimized ? 'var(--text-primary)' : 'var(--text-muted)' }}>Diseño con Errores (Violaciones)</span>
        <button 
          onClick={() => {
            setIsOptimized(!isOptimized);
            setSubmitMessage(null);
            setFormErrors({});
          }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: isOptimized ? 'var(--secondary)' : 'var(--text-muted)' }}
          aria-label={isOptimized ? "Desactivar optimización de usabilidad" : "Activar optimización de usabilidad"}
        >
          {isOptimized ? <ToggleRight size={44} /> : <ToggleLeft size={44} />}
        </button>
        <span style={{ fontWeight: 700, color: isOptimized ? 'var(--secondary)' : 'var(--text-muted)' }}>Diseño Optimizado (Usable e Inclusivo)</span>
      </div>

      <div className="heuristic-playground">
        {/* Form Mockup Viewport */}
        <div className="mockup-canvas">
          <div className="mockup-header">
            <span>Vista de la Interfaz - Formulario de Registro</span>
          </div>

          {!isOptimized ? (
            /* Bad Form representation */
            <form onSubmit={handleSubmit} className="bad-form">
              <div style={{ marginBottom: '1rem' }}>
                <label>Nombre:</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  placeholder="name"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>E-mail:</label>
                <input 
                  type="text" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="e-mail"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>Pass:</label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="password"
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                <button type="submit" className="submit-btn">ENVIAR</button>
                <button type="button" onClick={handleCancel} className="cancel-btn">CANCEL</button>
              </div>

              {submitMessage && (
                <div style={{ color: 'red', marginTop: '1rem', fontSize: '11px', fontWeight: 'bold' }}>
                  {submitMessage.text}
                </div>
              )}
            </form>
          ) : (
            /* Good/Optimized Form representation */
            <form onSubmit={handleSubmit} className="good-form">
              <div className="form-group">
                <label htmlFor="user-name">Nombre Completo</label>
                <input 
                  id="user-name"
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  placeholder="Ej. Juan Pérez Cabrera"
                  aria-describedby="name-helper"
                />
                <span id="name-helper" className="form-helper">Ingresa tu nombre y apellido para el certificado.</span>
                {formErrors.name && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                    <AlertTriangle size={12} /> {formErrors.name}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="user-email">Correo Electrónico Institucional</label>
                <input 
                  id="user-email"
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  placeholder="ejemplo@manuela.edu.co"
                  aria-describedby="email-helper"
                />
                <span id="email-helper" className="form-helper">No compartiremos tu correo electrónico con nadie.</span>
                {formErrors.email && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                    <AlertTriangle size={12} /> {formErrors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="user-password">Contraseña</label>
                <input 
                  id="user-password"
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  aria-describedby="password-helper"
                />
                <span id="password-helper" className="form-helper">Usa una mezcla de letras y números para mayor seguridad.</span>
                {formErrors.password && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                    <AlertTriangle size={12} /> {formErrors.password}
                  </span>
                )}
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-success" 
                  disabled={isSubmitting}
                  style={{ minWidth: '130px' }}
                >
                  {isSubmitting ? 'Procesando...' : 'Crear Cuenta'}
                </button>
                <button 
                  type="button" 
                  onClick={handleCancel} 
                  className="btn btn-secondary"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
              </div>

              {submitMessage && (
                <div style={{ 
                  padding: '0.75rem', 
                  borderRadius: '0.5rem', 
                  marginTop: '1rem', 
                  fontSize: '0.85rem',
                  backgroundColor: submitMessage.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: submitMessage.type === 'success' ? 'var(--secondary-hover)' : 'var(--danger)',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem' 
                }}>
                  {submitMessage.type === 'success' ? <Check size={18} /> : <AlertTriangle size={18} />}
                  <span>{submitMessage.text}</span>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Heuristic Violations Log */}
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifycontent: 'space-between' }}>
          <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Eye size={20} style={{ color: 'var(--primary)' }} />
            Análisis de Heurísticas en esta Interfaz:
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
              <strong style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: isOptimized ? 'var(--secondary)' : '#ef4444' }}>
                {isOptimized ? <Check size={14} /> : <X size={14} />} 
                Heurística #1: Visibilidad del estado del sistema
              </strong>
              <p style={{ margin: '0.25rem 0 0', color: 'var(--text-muted)' }}>
                {!isOptimized 
                  ? 'El formulario malo no tiene indicador de carga en el botón, lo que incita al usuario a hacer doble clic.' 
                  : 'El formulario corregido deshabilita botones y muestra "Procesando..." durante el envío para dar retroalimentación.'}
              </p>
            </div>

            <div style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
              <strong style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: isOptimized ? 'var(--secondary)' : '#ef4444' }}>
                {isOptimized ? <Check size={14} /> : <X size={14} />} 
                Heurística #5: Prevención de errores
              </strong>
              <p style={{ margin: '0.25rem 0 0', color: 'var(--text-muted)' }}>
                {!isOptimized 
                  ? 'Los campos del formulario malo tienen bordes rojos por defecto (simula error de forma errática), confundiendo sobre el estado real.' 
                  : 'El formulario optimizado tiene bordes limpios y un formato claro. Las guías de seguridad previenen contraseñas débiles.'}
              </p>
            </div>

            <div style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
              <strong style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: isOptimized ? 'var(--secondary)' : '#ef4444' }}>
                {isOptimized ? <Check size={14} /> : <X size={14} />} 
                Heurística #8: Diseño estético y minimalista
              </strong>
              <p style={{ margin: '0.25rem 0 0', color: 'var(--text-muted)' }}>
                {!isOptimized 
                  ? 'Controles diminutos, desalineación extrema, colores chillones no coherentes y etiquetas genéricas.' 
                  : 'Diseño limpio con espaciado consistente, etiquetas amplias y legibles, y enfoque sutil para evitar ruido visual.'}
              </p>
            </div>

            <div style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
              <strong style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: isOptimized ? 'var(--secondary)' : '#ef4444' }}>
                {isOptimized ? <Check size={14} /> : <X size={14} />} 
                Heurística #9: Diagnóstico y recuperación de errores
              </strong>
              <p style={{ margin: '0.25rem 0 0', color: 'var(--text-muted)' }}>
                {!isOptimized 
                  ? 'El mensaje de error "ERROR 5028: PARAMS_MISSING" es críptico, incomprensible y no le dice al usuario cómo resolver el problema.' 
                  : 'El formulario optimizado le dice con precisión qué campo falta o qué formato está equivocado y sugiere cómo solucionarlo.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
