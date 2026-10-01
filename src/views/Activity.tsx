import { motion } from 'framer-motion';
import { Activity, Check, Search, FolderOpen, Terminal, FileText, Bot, Clock } from 'lucide-react';

const mockActivity = [
  { id: 1, time: '14:35', action: 'Tests ejecutados', detail: '23/23 tests aprobados', icon: Check, type: 'success' },
  { id: 2, time: '14:34', action: 'Tests en ejecución', detail: 'project/tests/', icon: Terminal, type: 'action' },
  { id: 3, time: '14:34', action: 'Archivo modificado', detail: 'src/api/routes.py', icon: FileText, type: 'action' },
  { id: 4, time: '14:33', action: 'VS Code abierto', detail: 'Proyecto Atlas', icon: Terminal, type: 'system' },
  { id: 5, time: '14:32', action: 'Archivos buscados', detail: '23 resultados encontrados', icon: Search, type: 'action' },
  { id: 6, time: '14:32', action: 'Orden recibida', detail: '"Organiza el proyecto Atlas"', icon: Bot, type: 'command' },
  { id: 7, time: '13:15', action: 'Memoria actualizada', detail: 'Nueva preferencia guardada', icon: Activity, type: 'memory' },
  { id: 8, time: '12:40', action: 'Dispositivo detectado', detail: 'iPhone conectado a la red', icon: Activity, type: 'system' },
  { id: 9, time: '11:20', action: 'Skill ejecutada', detail: 'Web Browser - 3 fuentes consultadas', icon: Search, type: 'action' },
  { id: 10, time: '10:05', action: 'Tarea completada', detail: 'Backup diario finalizado', icon: Check, type: 'success' },
];

const typeColors: Record<string, string> = {
  success: 'var(--success)',
  action: 'var(--accent)',
  system: 'var(--info)',
  command: 'var(--warning)',
  memory: 'var(--accent)',
};

export default function ActivityView() {
  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
          <Activity size={20} style={{ color: 'var(--accent)' }} />
        </div>
        <div>
          <h1 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>Actividad</h1>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Registro cronológico de acciones</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px" style={{ background: 'var(--border-subtle)' }} />

          {mockActivity.map((item, i) => {
            const Icon = item.icon;
            const color = typeColors[item.type];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-4 pb-4 relative"
              >
                {/* Dot */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                  style={{ background: 'var(--surface)', border: `2px solid ${color}30` }}>
                  <Icon size={14} style={{ color }} />
                </div>

                {/* Content */}
                <div className="flex-1 pt-1.5">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{item.action}</p>
                    <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                      <Clock size={9} /> {item.time}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{item.detail}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
