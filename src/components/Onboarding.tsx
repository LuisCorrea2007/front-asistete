import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import JarvisEyes from './JarvisEyes';

interface OnboardingProps {
  onComplete: (name: string, userName: string) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [assistantName, setAssistantName] = useState('JARVIS');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

  const steps = [
    { title: 'Bienvenido.', subtitle: '¿Cómo quieres llamar a tu asistente?' },
    { title: 'Encantado.', subtitle: '¿Cómo quieres que te llame?' },
    { title: 'Perfecto.', subtitle: 'Personalidad configurada como Adaptativa.' },
    { title: 'Preparando todo.', subtitle: 'Configurando sistemas...' },
    { title: 'Listo.', subtitle: '' },
  ];

  const handleNext = () => {
    if (step === 3) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(4);
      }, 2500);
    } else if (step === 4) {
      onComplete(assistantName, userName || 'Usuario');
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'var(--background)' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-8 max-w-md w-full px-6"
      >
        {/* Eyes */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <JarvisEyes state="idle" size="xl" />
        </motion.div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="text-center"
          >
            <h2 className="text-2xl font-light mb-2" style={{ color: 'var(--text)' }}>
              {steps[step].title}
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {steps[step].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Input or loading */}
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="input0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
              <input
                type="text"
                value={assistantName}
                onChange={(e) => setAssistantName(e.target.value)}
                placeholder="Nombre del asistente"
                className="w-full text-center text-lg py-3 px-4 rounded-xl outline-none"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
                autoFocus
              />
            </motion.div>
          )}
          {step === 1 && (
            <motion.div key="input1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Tu nombre"
                className="w-full text-center text-lg py-3 px-4 rounded-xl outline-none"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
                autoFocus
              />
            </motion.div>
          )}
          {step === 3 && loading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full space-y-3">
              {['Configurando Ollama...', 'Descargando modelo...', 'Preparando memoria...', 'Conectando sistemas...'].map((text, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.6 }}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg"
                  style={{ background: 'var(--surface)' }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-3 h-3 rounded-full border-2 border-t-transparent"
                    style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }}
                  />
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{text}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
          {step === 4 && (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <p className="text-lg" style={{ color: 'var(--text)' }}>
                Hola{userName ? `, ${userName}` : ''}. Estoy listo.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button */}
        {step !== 3 && (
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 rounded-xl text-sm font-medium transition-all"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            {step === 4 ? 'Comenzar' : 'Continuar'}
          </motion.button>
        )}

        {/* Step indicators */}
        <div className="flex items-center gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all"
              style={{
                background: i <= step ? 'var(--accent)' : 'var(--border)',
                transform: i === step ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
