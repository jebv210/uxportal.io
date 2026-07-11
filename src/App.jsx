import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  HelpCircle, 
  Layers, 
  CheckCircle, 
  Sun, 
  Moon, 
  Accessibility, 
  Info, 
  ArrowRight, 
  Award, 
  Users, 
  ClipboardCheck, 
  BookOpen, 
  Sliders,
  ChevronRight
} from 'lucide-react';
import './App.css';
import UsabilitySimulator from './components/UsabilitySimulator';
import AccessibilityDemo from './components/AccessibilityDemo';
import HeuristicEvaluator from './components/HeuristicEvaluator';

export default function App() {
  // Theme & Accessibility States
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });
  const [fontScale, setFontScale] = useState(1);
  const [daltonism, setDaltonism] = useState('none');
  const [screenReader, setScreenReader] = useState(false);
  
  // Tab Navigation State: 'inicio' | 'nociones' | 'comparativa' | 'ciclo' | 'evaluacion'
  const [activeTab, setActiveTab] = useState('inicio');
  
  // Interactive Stepper State (within Ciclo de Vida tab)
  const [activeStep, setActiveStep] = useState(0);

  // Sync theme to document element attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Speech helper for simulated screen reader
  const speak = (text) => {
    if (screenReader && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    speak(`Tema cambiado a modo ${nextTheme === 'light' ? 'claro' : 'oscuro'}`);
  };

  const handleTabChange = (tabId, labelText) => {
    setActiveTab(tabId);
    speak(`Vista cambiada a: ${labelText}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 6 Stages of the Usability Life Cycle
  const lifeCycleSteps = [
    {
      title: "1. Investigación de usuarios",
      desc: "Se identifican los perfiles de usuarios reales, sus objetivos, necesidades de información y contextos de uso diarios.",
      action: "Entrevistas, creación de Personas y mapas de empatía."
    },
    {
      title: "2. Análisis de requisitos",
      desc: "Definición de las especificaciones y métricas de usabilidad que el sitio web debe cumplir, tales como tiempos máximos de tarea.",
      action: "Definición de casos de uso y requerimientos de información."
    },
    {
      title: "3. Diseño de prototipos",
      desc: "Creación de modelos de la interfaz de usuario, desde bocetos en papel (baja fidelidad) hasta prototipos interactivos (alta fidelidad).",
      action: "Flujos de navegación, wireframes y maquetas UI."
    },
    {
      title: "4. Desarrollo",
      desc: "Implementación técnica del frontend y backend aplicando pautas de diseño web responsivo, optimización de velocidad y buenas prácticas.",
      action: "Codificación con semántica HTML5 y estilos fluidos."
    },
    {
      title: "5. Evaluación de usabilidad",
      desc: "Pruebas directas con usuarios reales o inspecciones de expertos para identificar fricción, cuellos de botella y problemas de diseño.",
      action: "Pruebas heurísticas de Nielsen y recorridos cognitivos."
    },
    {
      title: "6. Mejora continua",
      desc: "Optimización continua y ajustes de diseño de forma iterativa basados en los datos recolectados después del lanzamiento público.",
      action: "Análisis de analítica web, métricas de clics e interacción."
    }
  ];

  return (
    <>
      {/* Keyboard Accessibility Bar */}
      <div 
        className="keyboard-assist-bar"
        onMouseEnter={() => speak("Barra de accesibilidad por teclado. Presiona Tabulador para navegar e Intro para activar enlaces.")}
      >
        <span>💡 Consejo de Accesibilidad: Navega presionando la tecla <strong>Tab</strong> y confirma con <strong>Enter</strong>.</span>
      </div>

      {/* Header and Navigation */}
      <header className="header-nav no-print">
        <div className="container nav-container">
          <button 
            className="logo-section"
            onClick={() => handleTabChange('inicio', 'Inicio')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
            onMouseEnter={() => speak("Logo Portal de Usabilidad y DCU. Presiona para ir al Inicio.")}
          >
            🎯 UX<span>Portal</span>
          </button>

          <nav aria-label="Menú principal de navegación">
            <ul className="nav-menu">
              <li>
                <button 
                  onClick={() => handleTabChange('inicio', 'Inicio')} 
                  className={`nav-link ${activeTab === 'inicio' ? 'active' : ''}`}
                  onFocus={() => speak("Enlace a la sección Inicio")}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleTabChange('nociones', 'Nociones de Usabilidad')} 
                  className={`nav-link ${activeTab === 'nociones' ? 'active' : ''}`}
                  onFocus={() => speak("Enlace a la sección Nociones")}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Nociones
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleTabChange('comparativa', 'Usabilidad versus Accesibilidad')} 
                  className={`nav-link ${activeTab === 'comparativa' ? 'active' : ''}`}
                  onFocus={() => speak("Enlace a la sección Usabilidad versus Accesibilidad")}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Usabilidad vs Accesibilidad
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleTabChange('ciclo', 'Ingeniería de Usabilidad')} 
                  className={`nav-link ${activeTab === 'ciclo' ? 'active' : ''}`}
                  onFocus={() => speak("Enlace a la sección Ingeniería de Usabilidad")}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Ciclo de Vida
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleTabChange('evaluacion', 'Evaluación de Usabilidad')} 
                  className={`nav-link ${activeTab === 'evaluacion' ? 'active' : ''}`}
                  onFocus={() => speak("Enlace a la sección Evaluación")}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Evaluación
                </button>
              </li>
            </ul>
          </nav>

          <div className="nav-controls">
            <button 
              onClick={toggleTheme} 
              className="btn-icon-only" 
              aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
              title={theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container" style={{ flexGrow: 1, paddingBottom: '4rem', paddingTop: '2.5rem' }}>
        
        {/* Render only the selected Tab */}
        <div className="tab-content">
          
          {/* TAB 1: INICIO */}
          {activeTab === 'inicio' && (
            <section id="inicio" className="hero-section" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div 
                className="hero-badge"
                onMouseEnter={() => speak("Etiqueta: Guía de Usabilidad y Accesibilidad Web.")}
              >
                Diseño Web Centrado en el Usuario • Guía Profesional
              </div>
              <h1 
                className="hero-title"
                onMouseEnter={() => speak("Título Principal: Usabilidad y Diseño Web Centrado en el Usuario.")}
              >
                Usabilidad y Diseño Web <br /> Centrado en el Usuario
              </h1>
              <p 
                className="hero-subtitle"
                onMouseEnter={() => speak("Subtítulo: Desarrollar interfaces eficientes, eficaces y accesibles es fundamental para garantizar el acceso democrático a la información.")}
              >
                Aprende a estructurar portales web intuitivos que faciliten el acceso a la información, eliminen barreras digitales de diseño y ofrezcan experiencias satisfactorias para todos los profesionales de la información.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }} className="no-print">
                <button onClick={() => handleTabChange('nociones', 'Nociones de Usabilidad')} className="btn btn-primary">
                  Comenzar Aprendizaje <ArrowRight size={18} />
                </button>
                <button onClick={() => handleTabChange('evaluacion', 'Evaluación de Usabilidad')} className="btn btn-secondary">
                  Ir al Laboratorio de Evaluación
                </button>
              </div>
            </section>
          )}

          {/* TAB 2: NOCIONES DE USABILIDAD */}
          {activeTab === 'nociones' && (
            <section id="pilares" style={{ animation: 'fadeIn 0.3s ease' }}>
              <div className="section-header">
                <span className="section-tag">Conceptos Clave</span>
                <h2 onMouseEnter={() => speak("Sección de Nociones Básicas de Usabilidad.")}>
                  Nociones Básicas de Usabilidad
                </h2>
                <p>
                  La <strong>usabilidad</strong> es el grado en que un producto, sistema o sitio web puede ser utilizado por personas específicas para alcanzar sus objetivos de forma <strong>eficaz, eficiente y satisfactoria</strong> dentro de un contexto determinado.
                </p>
              </div>

              {/* Cards for Eficacia, Eficiencia, Satisfaccion */}
              <div className="grid-3">
                <div 
                  className="glass-card"
                  onMouseEnter={() => speak("Tarjeta de Eficacia: Completar correctamente una tarea.")}
                >
                  <div className="card-icon-wrapper success">
                    <CheckCircle size={24} />
                  </div>
                  <h3>Eficacia</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Se refiere a la capacidad del usuario de completar correctamente y con precisión las tareas deseadas dentro de la página web (ej. realizar un registro sin errores).
                  </p>
                </div>

                <div 
                  className="glass-card"
                  onMouseEnter={() => speak("Tarjeta de Eficiencia: Realizar tareas con el menor tiempo y esfuerzo posible.")}
                >
                  <div className="card-icon-wrapper">
                    <Compass size={24} />
                  </div>
                  <h3>Eficiencia</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Mide la cantidad de tiempo, pasos y esfuerzo cognitivo requeridos por el usuario para completar con éxito su objetivo (ej. encontrar información en pocos clics).
                  </p>
                </div>

                <div 
                  className="glass-card"
                  onMouseEnter={() => speak("Tarjeta de Satisfacción: Ofrecer una experiencia visual y funcional agradable.")}
                >
                  <div className="card-icon-wrapper warning">
                    <Award size={24} />
                  </div>
                  <h3>Satisfacción</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Se trata de la dimensión subjetiva: qué tan cómoda, intuitiva y agradable fue la experiencia para el usuario mientras navegaba en el portal.
                  </p>
                </div>
              </div>

              <div style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto 3rem' }}>
                <h4 style={{ marginBottom: '0.75rem' }}>Importancia para los profesionales de la información:</h4>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <li><strong>Facilita el acceso a la información:</strong> El usuario encuentra de inmediato lo que busca sin perderse.</li>
                  <li><strong>Reducción de errores del usuario:</strong> Diseños más intuitivos previenen contratiempos.</li>
                  <li><strong>Mejora la experiencia general:</strong> Fideliza a los usuarios en entornos virtuales de aprendizaje.</li>
                  <li><strong>Incrementa la productividad:</strong> Los flujos de trabajo se ejecutan en menor tiempo y con menor esfuerzo.</li>
                </ul>
              </div>

              {/* Embedded Usability Interactive Simulator */}
              <div className="no-print">
                <UsabilitySimulator />
              </div>
            </section>
          )}

          {/* TAB 3: USABILIDAD VS ACCESIBILIDAD */}
          {activeTab === 'comparativa' && (
            <section id="comparativa" style={{ animation: 'fadeIn 0.3s ease' }}>
              
              {/* Floating/Embedded Accessibility Demo Box is always on top in this view */}
              <div className="no-print" style={{ marginBottom: '2.5rem' }}>
                <AccessibilityDemo 
                  fontScale={fontScale}
                  setFontScale={setFontScale}
                  daltonism={daltonism}
                  setDaltonism={setDaltonism}
                  screenReader={screenReader}
                  setScreenReader={setScreenReader}
                />
              </div>

              <div className="section-header">
                <span className="section-tag">Diseño Inclusivo</span>
                <h2 onMouseEnter={() => speak("Sección de Usabilidad versus Accesibilidad.")}>
                  Usabilidad y Accesibilidad
                </h2>
                <p>
                  La <strong>usabilidad</strong> busca que un sistema sea fácil de utilizar para sus usuarios objetivos, mientras que la <strong>accesibilidad</strong> garantiza que todas las personas, incluidas aquellas con discapacidades físicas, motoras, visuales o cognitivas, puedan acceder y utilizar el contenido.
                </p>
              </div>

              {/* Comparison table */}
              <div className="table-container">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th scope="col">Criterio</th>
                      <th scope="col">Usabilidad</th>
                      <th scope="col">Accesibilidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Enfoque</strong></td>
                      <td>Facilidad de uso y navegación fluida.</td>
                      <td>Facilidad de acceso eliminando barreras físicas/digitales.</td>
                    </tr>
                    <tr>
                      <td><strong>Objetivo</strong></td>
                      <td>Mejora la experiencia del usuario promedio.</td>
                      <td>Permite la inclusión de personas con limitaciones temporales o de capacidad.</td>
                    </tr>
                    <tr>
                      <td><strong>Criterios de Éxito</strong></td>
                      <td>Menos clics, rapidez, satisfacción estética.</td>
                      <td>Cumplimiento de contrastes mínimos, alternativas de texto y atajos de teclado.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Examples of accessibility */}
              <div className="grid-2" style={{ marginTop: '2.5rem' }}>
                <div className="glass-card" style={{ textAlign: 'left' }}>
                  <h4 style={{ marginBottom: '1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Accessibility size={20} /> Ejemplos de Accesibilidad Web
                  </h4>
                  <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                    <li><strong>Texto alternativo en imágenes:</strong> Permite que personas con discapacidad visual 'escuchen' el contenido gráfico.</li>
                    <li><strong>Navegación con teclado:</strong> Vital para quienes no pueden emplear el mouse debido a limitaciones motoras.</li>
                    <li><strong>Buen contraste de colores:</strong> Asegura la legibilidad para daltónicos o personas con baja visión.</li>
                    <li><strong>Subtítulos en videos:</strong> Elimina barreras de acceso para la población con discapacidad auditiva.</li>
                  </ul>
                </div>

                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <Info size={32} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                  <h4>Filosofía de Arquitectura de Información</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    "Una interfaz usable pero inaccesible excluye a una parte significativa de la población. Una interfaz accesible pero inusable frustra al usuario. Ambos pilares deben coexistir para un desarrollo de software íntegro y profesional."
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* TAB 4: CICLO DE VIDA E INGENIERÍA */}
          {activeTab === 'ciclo' && (
            <section id="ingenieria" style={{ animation: 'fadeIn 0.3s ease' }}>
              <div className="section-header">
                <span className="section-tag">Metodología de Desarrollo</span>
                <h2 onMouseEnter={() => speak("Sección de Ingeniería de Usabilidad y ciclo de vida.")}>
                  Ingeniería de Usabilidad
                </h2>
                <p>
                  Es una metodología estructurada que integra la usabilidad durante todo el ciclo de vida del producto para comprender al usuario, diseñar interfaces intuitivas, reducir errores y evaluar el sistema continuamente.
                </p>
              </div>

              <div className="grid-2" style={{ alignItems: 'start' }}>
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{ marginBottom: '1rem' }}>Objetivos de la Ingeniería</h3>
                  <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6', marginBottom: '2rem' }}>
                    <li>Comprender exhaustivamente las necesidades del usuario.</li>
                    <li>Diseñar interfaces intuitivas acordes al contexto.</li>
                    <li>Reducir errores críticos cometidos por el usuario final.</li>
                    <li>Evaluar continuamente el sistema mediante ciclos de retroalimentación.</li>
                  </ul>

                  <h3>Etapas del Ciclo de Vida</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    El ciclo de vida sigue un proceso iterativo de 5 etapas esenciales:
                  </p>
                  <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <li><strong>Investigación:</strong> Estudiar al usuario.</li>
                    <li><strong>Diseño:</strong> Idear soluciones y bocetar.</li>
                    <li><strong>Desarrollo:</strong> Implementar en código frontend.</li>
                    <li><strong>Evaluación:</strong> Inspeccionar errores y validar.</li>
                    <li><strong>Mejora:</strong> Ajustar continuamente según los resultados.</li>
                  </ol>
                </div>

                {/* Interactive Timeline Stepper */}
                <div>
                  <h3 style={{ marginBottom: '0.5rem' }}>Ciclo de Vida de Usabilidad (Interactivo)</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    Haz clic en cada fase para visualizar su descripción y entregable principal:
                  </p>
                  
                  <div className="timeline-stepper">
                    {lifeCycleSteps.map((step, idx) => (
                      <div 
                        key={idx} 
                        className={`timeline-step ${activeStep === idx ? 'active' : ''}`}
                        onClick={() => {
                          setActiveStep(idx);
                          speak(`Fase: ${step.title}. ${step.desc}`);
                        }}
                      >
                        <div className="timeline-step-badge">
                          {idx + 1}
                        </div>
                        <div className="timeline-step-content">
                          <h4 style={{ fontSize: '0.95rem', margin: 0, color: activeStep === idx ? 'var(--primary)' : 'var(--text-primary)' }}>
                            {step.title}
                          </h4>
                          {activeStep === idx && (
                            <div style={{ marginTop: '0.5rem', animation: 'fadeIn 0.2s ease' }}>
                              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                {step.desc}
                              </p>
                              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)' }}>
                                🛠️ Acción: {step.action}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB 5: EVALUACIÓN Y DISEÑO CENTRADO EN EL USUARIO */}
          {activeTab === 'evaluacion' && (
            <section id="evaluacion" style={{ animation: 'fadeIn 0.3s ease' }}>
              <div className="section-header">
                <span className="section-tag">Validación de Diseño</span>
                <h2 onMouseEnter={() => speak("Sección de Métodos de Evaluación y Diseño Centrado en el Usuario.")}>
                  Métodos de Evaluación y DCU
                </h2>
                <p>
                  Evaluar es indispensable para asegurar que las pautas se cumplan. A continuación se listan los métodos de evaluación tradicionales, combinados con una demostración interactiva de Heurísticas de Nielsen y principios del Diseño Centrado en el Usuario (DCU).
                </p>
              </div>

              {/* Methods List Cards */}
              <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'left' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Inspecciones de Expertos</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Incluye la <strong>evaluación heurística</strong> (verificación de principios de Nielsen) y el <strong>recorrido cognitivo</strong> (simular las decisiones del usuario).
                  </p>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'left' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Pruebas con Usuarios</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Observaciones directas de personas reales operando el sistema. Capturan con precisión fallos de navegación y comprensión.
                  </p>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'left' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Métodos de Opinión</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <strong>Encuestas</strong>, <strong>entrevistas</strong> y cuestionarios post-tarea para recopilar la satisfacción cualitativa y cuantitativa.
                  </p>
                </div>
              </div>

              {/* Redesign Lab */}
              <div className="no-print" style={{ marginBottom: '3.5rem' }}>
                <HeuristicEvaluator />
              </div>

              {/* DCU details */}
              <div className="section-header" style={{ marginBottom: '2rem' }}>
                <span className="section-tag">Filosofía DCU</span>
                <h3>Diseño Centrado en el Usuario</h3>
                <p style={{ fontSize: '0.95rem' }}>
                  El DCU coloca las necesidades y expectativas del usuario en el centro del proceso de diseño.
                </p>
              </div>

              <div className="grid-2">
                <div className="glass-card" style={{ textAlign: 'left' }}>
                  <h4 style={{ marginBottom: '1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={20} /> Principios del DCU
                  </h4>
                  <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <li>Comprender activamente al usuario y su contexto de uso.</li>
                    <li>Fomentar la participación directa del usuario.</li>
                    <li>Desarrollar mediante un diseño iterativo constante.</li>
                    <li>Realizar evaluaciones periódicas en cada fase.</li>
                    <li>Garantizar accesibilidad e inclusión en el producto final.</li>
                  </ul>
                </div>

                <div className="glass-card" style={{ textAlign: 'left' }}>
                  <h4 style={{ marginBottom: '1rem', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ClipboardCheck size={20} /> Beneficios del DCU
                  </h4>
                  <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <li>Mayor nivel de satisfacción por parte de la comunidad de usuarios.</li>
                    <li>Disminución significativa de errores cometidos al operar la interfaz.</li>
                    <li>Navegación eficiente que ahorra tiempo y esfuerzo cognitivo.</li>
                    <li>Mayor efectividad en el cumplimiento de tareas complejas.</li>
                  </ul>
                </div>
              </div>
            </section>
          )}

        </div>

        {/* Conclusion Section (Visible on all views) */}
        <section id="conclusion" className="section" style={{ marginTop: '4rem' }}>
          <div className="section-header" style={{ marginBottom: '0.5rem' }}>
            <span className="section-tag">Cierre Temático</span>
            <h2 onMouseEnter={() => speak("Conclusión del tema de usabilidad.")}>Conclusión</h2>
            <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1rem', color: 'var(--text-secondary)' }}>
              La usabilidad, la accesibilidad, la ingeniería de usabilidad, sus métodos de evaluación y el diseño centrado en el usuario son elementos fundamentales para desarrollar sitios web intuitivos, eficientes e inclusivos. Aplicar este enfoque no es solo una buena práctica técnica, sino un compromiso ético para erradicar las brechas de acceso a la información en el ecosistema digital moderno.
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="footer no-print">
        <div className="container">
          <p>© {new Date().getFullYear()} - Portal Profesional de Usabilidad y DCU</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Guía de Prácticas Profesionales | Diseñado bajo Pautas de Usabilidad y Accesibilidad Web
          </p>
        </div>
      </footer>
    </>
  );
}
