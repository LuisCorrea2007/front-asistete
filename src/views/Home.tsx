import { motion, AnimatePresence } from 'framer-motion';
import JarvisEyes from '../components/JarvisEyes';
import CommandBar from '../components/CommandBar';
import StatusIndicator from '../components/StatusIndicator';

type JarvisState = 'idle' | 'listening' | 'thinking' | 'working' | 'success' | 'error' | 'sleeping' | 'privacy' | 'alert';

interface HomeViewProps {
  jarvisState: JarvisState;
  onMessage: (msg: string) => void;
  userName: string;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 6) return 'Buenas noches';
  if (hour < 12) return 'Buenos días';
  if (hour < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

function getContextMessage(state: JarvisState, userName: string): string {
  switch (state) {
    case 'idle': return `${getGreeting()}, ${userName}. ¿Qué necesitas?`;
    case 'listening': return 'Te escucho...';
    case 'thinking': return 'Procesando...';
    case 'working': return 'Estoy en ello...';
    case 'success': return 'Listo.';
    case 'error': return 'Algo no salió como esperaba.';
    case 'sleeping': return 'En pausa. Toca para activar.';
    case 'privacy': return 'Modo privado activo.';
    case 'alert': return 'Necesito tu atención.';
    default: return '¿En qué puedo ayudarte?';
  }
}

// Recent activity items for the home view
const recentItems = [
  { icon: '📁', text: 'Proyecto Atlas modificado', time: 'hace 2h', type: 'file' },
  { icon: '✅', text: 'Tarea completada: Deploy API', time: 'hace 4h', type: 'task' },
  { icon: '💡', text: 'Luz del salón encendida', time: 'hace 5h', type: 'home' },
  { icon: '🔍', text: 'Búsqueda: patrones de diseño', time: 'ayer', type: 'search' },
];

export default function HomeView({ jarvisState, onMessage, userName }: HomeViewProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 relative">
      {/* Status indicator - top right */}
      <div className="absolute top-6 right-6">
        <StatusIndicator state={jarvisState} />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-col items-center gap-8 max-w-2xl w-full"
      >
        {/* Eyes */}
        <motion.div
          animate={jarvisState === 'idle' ? { y: [0, -3, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-2"
        >
          <JarvisEyes state={jarvisState} size="xl" />
        </motion.div>

        {/* Context message */}
        <AnimatePresence mode="wait">
          <motion.p
            key={jarvisState}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-lg font-light text-center"
            style={{ color: 'var(--text-secondary)' }}
          >
            {getContextMessage(jarvisState, userName)}
          </motion.p>
        </AnimatePresence>

        {/* Command Bar */}
        <div className="w-full mt-4">
          <CommandBar
            onSubmit={onMessage}
            jarvisState={jarvisState}
          />
        </div>

        {/* Quick suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mt-2"
        >
          {['Busca el PDF de ayer', '¿Qué tareas tengo?', 'Enciende las luces', 'Revisa mis dispositivos'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => onMessage(suggestion)}
              className="px-3 py-1.5 text-xs rounded-full transition-all hover:scale-105"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
            >
              {suggestion}
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* Recent activity - bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-8 left-8 right-8 max-w-xl mx-auto"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
            Actividad reciente
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {recentItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all hover:scale-[1.02]"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <span className="text-base">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs truncate" style={{ color: 'var(--text)' }}>{item.text}</p>
                <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{item.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
