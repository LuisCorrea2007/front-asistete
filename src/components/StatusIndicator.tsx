import { motion } from 'framer-motion';

type JarvisState = 'idle' | 'listening' | 'thinking' | 'working' | 'success' | 'error' | 'sleeping' | 'privacy' | 'alert';

interface StatusIndicatorProps {
  state: JarvisState;
  onClick?: () => void;
}

const stateLabels: Record<JarvisState, string> = {
  idle: 'LISTO',
  listening: 'ESCUCHANDO',
  thinking: 'PENSANDO',
  working: 'TRABAJANDO',
  success: 'COMPLETADO',
  error: 'ERROR',
  sleeping: 'EN PAUSA',
  privacy: 'PRIVADO',
  alert: 'ALERTA',
};

const stateColors: Record<JarvisState, string> = {
  idle: 'var(--success)',
  listening: 'var(--accent)',
  thinking: 'var(--info)',
  working: 'var(--accent)',
  success: 'var(--success)',
  error: 'var(--danger)',
  sleeping: 'var(--text-tertiary)',
  privacy: 'var(--warning)',
  alert: 'var(--warning)',
};

export default function StatusIndicator({ state, onClick }: StatusIndicatorProps) {
  const color = stateColors[state];
  const label = stateLabels[state];

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="relative">
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: color }}
        />
        {(state === 'working' || state === 'thinking' || state === 'listening') && (
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full"
            style={{ background: color }}
          />
        )}
      </div>
      <span className="text-[11px] font-medium tracking-wide" style={{ color }}>
        {label}
      </span>
    </motion.button>
  );
}
