import { motion } from 'framer-motion';
import { MessageSquare, Clock, Trash2, Pin } from 'lucide-react';

const mockConversations = [
  { id: 1, title: 'Organizar proyecto Atlas', lastMessage: '23/23 tests aprobados correctamente', time: 'hace 5 min', messages: 12, pinned: true },
  { id: 2, title: 'Configurar Home Assistant', lastMessage: '¿Quieres que añada más dispositivos?', time: 'hace 2h', messages: 8, pinned: false },
  { id: 3, title: 'Investigación patrones de diseño', lastMessage: 'Encontré 5 patrones relevantes para tu proyecto', time: 'hace 5h', messages: 15, pinned: false },
  { id: 4, title: 'Planificar semana', lastMessage: 'Tienes 3 reuniones y 2 deadlines esta semana', time: 'ayer', messages: 6, pinned: true },
  { id: 5, title: 'Analizar logs del servidor', lastMessage: 'No se encontraron errores críticos', time: 'ayer', messages: 4, pinned: false },
  { id: 6, title: 'Receta para cena', lastMessage: '¿Te gustaría que guarde esta receta?', time: 'hace 2 días', messages: 3, pinned: false },
];

export default function ConversationsView() {
  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
          <MessageSquare size={20} style={{ color: 'var(--accent)' }} />
        </div>
        <div>
          <h1 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>Conversaciones</h1>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{mockConversations.length} conversaciones</p>
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {mockConversations.map((conv, i) => (
          <motion.div
            key={conv.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group p-4 rounded-xl transition-all hover:scale-[1.01] cursor-pointer"
            style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {conv.pinned && <Pin size={10} style={{ color: 'var(--accent)' }} />}
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>{conv.title}</p>
                </div>
                <p className="text-xs mt-1 truncate" style={{ color: 'var(--text-secondary)' }}>{conv.lastMessage}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
                    <Clock size={9} /> {conv.time}
                  </span>
                  <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                    {conv.messages} mensajes
                  </span>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-[var(--danger-soft)] transition-all">
                <Trash2 size={12} style={{ color: 'var(--danger)' }} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
