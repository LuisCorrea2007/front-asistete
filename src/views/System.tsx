import { motion } from 'framer-motion';
import { Server, CheckCircle, XCircle, AlertTriangle, Minus } from 'lucide-react';

type HealthStatus = 'healthy' | 'degraded' | 'offline' | 'error' | 'not_configured';

interface SystemComponent {
  name: string;
  status: HealthStatus;
  detail?: string;
}

const mockSystem: SystemComponent[] = [
  { name: 'Core', status: 'healthy', detail: 'v2.1.0' },
  { name: 'Memory', status: 'healthy', detail: '2.4 GB / 8 GB' },
  { name: 'AI Model', status: 'healthy', detail: 'Qwen3 4B' },
  { name: 'Ollama', status: 'healthy', detail: 'Running on :11434' },
  { name: 'Voice', status: 'healthy', detail: 'Piper TTS' },
  { name: 'Tools', status: 'healthy', detail: '14 disponibles' },
  { name: 'Skills', status: 'healthy', detail: '6 activas' },
  { name: 'Database', status: 'healthy', detail: 'SQLite' },
  { name: 'Network', status: 'degraded', detail: 'Latencia alta' },
  { name: 'Home Assistant', status: 'not_configured', detail: 'No configurado' },
  { name: 'Satellites', status: 'healthy', detail: '2 conectados' },
  { name: 'Browser', status: 'healthy', detail: 'Playwright' },
];

const statusConfig: Record<HealthStatus, { icon: typeof CheckCircle; color: string; label: string }> = {
  healthy: { icon: CheckCircle, color: 'var(--success)', label: 'HEALTHY' },
  degraded: { icon: AlertTriangle, color: 'var(--warning)', label: 'DEGRADED' },
  offline: { icon: Minus, color: 'var(--text-tertiary)', label: 'OFFLINE' },
  error: { icon: XCircle, color: 'var(--danger)', label: 'ERROR' },
  not_configured: { icon: Minus, color: 'var(--text-tertiary)', label: 'NOT CONFIGURED' },
};

export default function SystemView() {
  const healthyCount = mockSystem.filter(s => s.status === 'healthy').length;

  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
          <Server size={20} style={{ color: 'var(--accent)' }} />
        </div>
        <div>
          <h1 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>Sistema</h1>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {healthyCount}/{mockSystem.length} componentes saludables
          </p>
        </div>
      </div>

      {/* Overall status */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl mb-5 flex items-center gap-4"
        style={{
          background: healthyCount === mockSystem.length ? 'var(--success-soft)' : 'var(--warning-soft)',
          border: `1px solid ${healthyCount === mockSystem.length ? 'var(--success)' : 'var(--warning)'}30`,
        }}
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: healthyCount === mockSystem.length ? 'var(--success-soft)' : 'var(--warning-soft)' }}>
          {healthyCount === mockSystem.length ? (
            <CheckCircle size={20} style={{ color: 'var(--success)' }} />
          ) : (
            <AlertTriangle size={20} style={{ color: 'var(--warning)' }} />
          )}
        </div>
        <div>
          <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>
            {healthyCount === mockSystem.length ? 'Todos los sistemas operativos' : 'Sistema parcialmente degradado'}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {healthyCount === mockSystem.length
              ? 'JARVIS funciona correctamente en todos sus componentes.'
              : 'Algunos componentes requieren atención.'}
          </p>
        </div>
      </motion.div>

      {/* Components grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {mockSystem.map((comp, i) => {
            const config = statusConfig[comp.status];
            const Icon = config.icon;
            return (
              <motion.div
                key={comp.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.01] cursor-pointer"
                style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}
              >
                <Icon size={14} style={{ color: config.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium" style={{ color: 'var(--text)' }}>{comp.name}</p>
                  {comp.detail && (
                    <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{comp.detail}</p>
                  )}
                </div>
                <span className="text-[9px] font-medium tracking-wider px-2 py-0.5 rounded-full"
                  style={{ color: config.color, background: `${config.color}15` }}>
                  {config.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
