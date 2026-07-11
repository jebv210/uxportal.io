import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle, Flame, Award } from 'lucide-react';

export default function UsabilitySimulator() {
  const [mode, setMode] = useState('good'); // 'good' | 'bad'
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'running' | 'completed'
  const [time, setTime] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [buttonPos, setButtonPos] = useState({ top: '50%', left: '50%' });
  const [satisfaction, setSatisfaction] = useState(5);
  const [showSurvey, setShowSurvey] = useState(false);
  const [results, setResults] = useState({
    good: null,
    bad: null
  });

  const timerRef = useRef(null);
  const canvasRef = useRef(null);

  // Start the usability experiment
  const startTest = () => {
    setGameState('running');
    setTime(0);
    setClicks(0);
    setShowSurvey(false);
    
    if (mode === 'bad') {
      randomizeButton();
    } else {
      setButtonPos({ top: '50%', left: '50%' });
    }
  };

  // Timer logic
  useEffect(() => {
    if (gameState === 'running') {
      timerRef.current = setInterval(() => {
        setTime((prev) => +(prev + 0.1).toFixed(1));
      }, 100);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState]);

  // Randomize button position (for bad usability mode)
  const randomizeButton = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Reserve margin so button stays inside
    const maxX = rect.width - 150;
    const maxY = rect.height - 40;
    
    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));
    
    setButtonPos({ top: `${randomY}px`, left: `${randomX}px` });
  };

  // Triggers when user hovers target in Bad Usability mode (jumping button!)
  const handleButtonHover = () => {
    if (mode === 'bad' && gameState === 'running') {
      randomizeButton();
      setClicks(prev => prev + 1); // Hovering is so frustrating it counts as effort/miss
    }
  };

  // Triggers when user clicks the target button
  const handleButtonClick = () => {
    if (gameState !== 'running') return;
    setClicks(prev => prev + 1);

    if (mode === 'bad') {
      // In bad usability, there's a 30% chance they actually click it,
      // otherwise it jumps away even on click (or has a loading delay)
      if (Math.random() > 0.3) {
        randomizeButton();
        return;
      }
      
      // Artificial delay simulation
      setGameState('completed');
      setShowSurvey(true);
    } else {
      // Good usability completes instantly
      setGameState('completed');
      setShowSurvey(true);
    }
  };

  // Submit satisfaction survey and store results
  const submitSurvey = () => {
    const score = {
      time,
      clicks,
      satisfaction
    };
    
    setResults(prev => ({
      ...prev,
      [mode]: score
    }));
    setShowSurvey(false);
  };

  const handleCanvasClick = (e) => {
    if (gameState !== 'running') return;
    // If clicking outside the target button, count as misclick
    if (e.target.id === 'simulator-canvas') {
      setClicks(prev => prev + 1);
    }
  };

  return (
    <div className="simulator-card glass-card">
      <div className="section-header" style={{ marginBottom: '1.5rem' }}>
        <span className="hero-badge">Simulador de Usabilidad</span>
        <h3>Experimento: Eficacia, Eficiencia y Satisfacción</h3>
        <p style={{ fontSize: '0.95rem' }}>
          Experimenta en carne propia cómo influye el diseño en la experiencia del usuario. Intenta hacer clic en el botón de abajo en ambos modos de diseño y compara los resultados.
        </p>
      </div>

      {/* Mode selectors */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => { setMode('good'); setGameState('idle'); setShowSurvey(false); }}
          className={`btn ${mode === 'good' ? 'btn-success' : 'btn-secondary'}`}
          disabled={gameState === 'running'}
        >
          Diseño con Buena Usabilidad
        </button>
        <button 
          onClick={() => { setMode('bad'); setGameState('idle'); setShowSurvey(false); }}
          className={`btn ${mode === 'bad' ? 'btn-primary' : 'btn-secondary'}`}
          style={mode === 'bad' ? { backgroundColor: '#ef4444', color: 'white' } : {}}
          disabled={gameState === 'running'}
        >
          Diseño con Mala Usabilidad
        </button>
      </div>

      {/* Simulator view */}
      <div className="simulator-card" style={{ border: '1px solid var(--border-color)' }}>
        <div className="simulator-toolbar">
          <span>Modo Actual: {mode === 'good' ? '🟢 Usable e Intuitivo' : '🔴 Diseñado para Frustrar'}</span>
          <span>Estado del Test: {gameState === 'running' ? '⏱️ Ejecutando...' : '💤 En Espera'}</span>
        </div>
        
        <div 
          id="simulator-canvas" 
          ref={canvasRef} 
          className="simulator-canvas" 
          onClick={handleCanvasClick}
          style={{ cursor: gameState === 'running' ? 'crosshair' : 'default', position: 'relative' }}
        >
          {gameState === 'idle' && (
            <div style={{ textAlign: 'center', maxWidth: '400px' }}>
              {mode === 'good' ? (
                <div>
                  <CheckCircle size={48} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
                  <h4 style={{ marginBottom: '0.5rem' }}>Prueba de Usabilidad Estándar</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    El botón está en el centro, tiene buen tamaño, responde inmediatamente y tiene etiquetas descriptivas.
                  </p>
                </div>
              ) : (
                <div>
                  <AlertTriangle size={48} style={{ color: '#ef4444', marginBottom: '1rem' }} />
                  <h4 style={{ marginBottom: '0.5rem' }}>Prueba de Frustración</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    El botón es diminuto, tiene un contraste de color deficiente, etiquetas confusas y se moverá aleatoriamente cuando intentes acercar el mouse.
                  </p>
                </div>
              )}
              <button onClick={startTest} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                <Play size={16} /> Iniciar Prueba
              </button>
            </div>
          )}

          {gameState === 'running' && (
            <>
              {mode === 'good' ? (
                <button 
                  onClick={handleButtonClick}
                  className="good-usability-btn"
                  style={{
                    position: 'absolute',
                    top: buttonPos.top,
                    left: buttonPos.left,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  Completar Tarea
                </button>
              ) : (
                <button 
                  onClick={handleButtonClick}
                  onMouseEnter={handleButtonHover}
                  className="bad-usability-btn"
                  style={{
                    position: 'absolute',
                    top: buttonPos.top,
                    left: buttonPos.left
                  }}
                  title="acción"
                >
                  CLIC AQUÍ SI QUIERES HACER LA ACCIÓN AHORA O MAÑANA TAL VEZ
                </button>
              )}
            </>
          )}

          {gameState === 'completed' && showSurvey && (
            <div className="glass-card" style={{ padding: '1.5rem', maxWidth: '400px', width: '90%', zIndex: 10 }}>
              <Award size={32} style={{ color: 'var(--accent)', marginBottom: '0.5rem' }} />
              <h4 style={{ marginBottom: '0.5rem' }}>¡Tarea Completada!</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Tiempo: <strong>{time}s</strong> | Intentos/Clics: <strong>{clicks}</strong>
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>¿Qué tan satisfecho estás con esta tarea?</span>
                  <strong>{satisfaction}/10</strong>
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={satisfaction} 
                  onChange={(e) => setSatisfaction(parseInt(e.target.value))}
                  className="slider-control"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Muy Insatisfecho</span>
                  <span>Extremadamente Satisfecho</span>
                </div>
              </div>
              
              <button onClick={submitSurvey} className="btn btn-primary" style={{ width: '100%' }}>
                Registrar Resultados
              </button>
            </div>
          )}

          {gameState === 'completed' && !showSurvey && (
            <div style={{ textAlign: 'center' }}>
              <CheckCircle size={40} style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }} />
              <h4 style={{ marginBottom: '0.5rem' }}>Resultados Registrados</h4>
              <button onClick={startTest} className="btn btn-secondary">
                <RotateCcw size={16} /> Reintentar
              </button>
            </div>
          )}
        </div>

        {/* Stats footer */}
        <div className="simulator-stats">
          <div className="simulator-stat-box">
            <div className="simulator-stat-val">{gameState === 'running' ? `${time}s` : '0.0s'}</div>
            <div className="simulator-stat-label">Eficiencia (Tiempo)</div>
          </div>
          <div className="simulator-stat-box">
            <div className="simulator-stat-val">{clicks}</div>
            <div className="simulator-stat-label">Esfuerzo (Clics/Acciones)</div>
          </div>
          <div className="simulator-stat-box">
            <div className="simulator-stat-val">
              {gameState === 'completed' ? '100%' : gameState === 'running' ? 'Buscando...' : '0%'}
            </div>
            <div className="simulator-stat-label">Eficacia (Éxito)</div>
          </div>
        </div>
      </div>

      {/* Comparison results */}
      {(results.good || results.bad) && (
        <div style={{ marginTop: '2rem', padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'rgba(var(--primary-rgb), 0.04)', border: '1px solid var(--border-color)', textAlign: 'left' }}>
          <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Flame size={20} style={{ color: 'var(--primary)' }} />
            Comparación en tiempo real de tu experiencia:
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <h5 style={{ color: 'var(--secondary)' }}>🟢 Diseño Usable (Vite + React)</h5>
              {results.good ? (
                <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  <li>⏱️ <strong>Eficiencia:</strong> {results.good.time} segundos</li>
                  <li>🖱️ <strong>Esfuerzo:</strong> {results.good.clicks} clics</li>
                  <li>😊 <strong>Satisfacción:</strong> {results.good.satisfaction} / 10</li>
                </ul>
              ) : (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.5rem' }}>No completado aún</p>
              )}
            </div>
            <div>
              <h5 style={{ color: '#ef4444' }}>🔴 Diseño Deficiente</h5>
              {results.bad ? (
                <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  <li>⏱️ <strong>Eficiencia:</strong> {results.bad.time} segundos</li>
                  <li>🖱️ <strong>Esfuerzo:</strong> {results.bad.clicks} clics</li>
                  <li>😠 <strong>Satisfacción:</strong> {results.bad.satisfaction} / 10</li>
                </ul>
              ) : (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.5rem' }}>No completado aún</p>
              )}
            </div>
          </div>
          {results.good && results.bad && (
            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <strong>Análisis Profesional:</strong> En el modo de mala usabilidad, perdiste 
              {' '}{(results.bad.time - results.good.time).toFixed(1)} segundos adicionales y requiriste
              {' '}{results.bad.clicks - results.good.clicks} acciones extra. Esto demuestra cómo la falta de 
              diseño centrado en el usuario deteriora directamente la <strong>eficiencia</strong>, desploma la <strong>satisfacción</strong> y pone en riesgo la <strong>eficacia</strong> de los profesionales de la información.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
