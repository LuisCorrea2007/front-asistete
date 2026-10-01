import { motion } from 'framer-motion';
import { Brain, Search, Pin, Trash2, Edit3, ExternalLink, Clock } from 'lucide-react';
import { useState } from 'react';

const categories = ['Todo', 'Sobre mí', 'Personas', 'Preferencias', 'Proyectos', 'Rutinas', 'Conversaciones', 'Aprendizajes'];

const mockMemories = [
  { id: 1, content: 'El usuario prefiere respuestas concisas', type: 'Preferencia', date: '2024-01-15', importance: 'alta', source: 'Conversación', pinned: true },
  { id: 2, content: 'Proyecto Atlas - API REST con FastAPI', type: 'Proyecto', date: '2024-01-14', importance: 'alta', source: 'Archivo', pinned: true },
  { id: 3, content: 'María es la compañera de trabajo del usuario', type: 'Persona', date: '2024-01-13', importance: 'media', source: 'Conversación', pinned: false },
  { id: 4, content: 'Reunión diaria a las 9:00 AM', type: 'Rutina', date: '2024-01-12', importance: 'media', source: 'Calendario', pinned: false },
  { id: 5, content: 'El usuario trabaja con Python y TypeScript', type: 'Sobre mí', date: '2024-01-11', importance: 'alta', source: 'Conversación', pinned: false },
  { id: 6, content: 'Prefiere modo oscuro en todas las aplicaciones', type: 'Preferencia', date: '2024-01-10', importance: 'baja', source: 'Sistema', pinned: false },
];

const importanceColors: Record<string, string> = {
  alta: 'var(--danger)',
  media: 'var(--warning)',
  baja: 'var(--text-tertiary)',
};

export default function MemoryView() {
  const [activeCategory, setActiveCategory] = useState('Todo');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = mockMemories.filter(m => {
    if (activeCategory !== 'Todo' && m.type !== activeCategory) return false;
    if (searchQuery && !m.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
          <Brain size={20} style={{ color: 'var(--accent)' }} />
        </div>
        <div>
          <h1 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>Memoria</h1>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{mockMemories.length} recuerdos almacenados</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar en mi memoria..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
        />
      </div>

      {/* Categories */}
      <div className="flex gap-1.5 mb-5 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all"
            style={{
              background: activeCategory === cat ? 'var(--accent-soft)' : 'var(--surface)',
              color: activeCategory === cat ? 'var(--accent)' : 'var(--text-secondary)',
              border: `1px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border-subtle)'}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Memory list */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Brain size={32} style={{ color: 'var(--text-tertiary)' }} className="mb-3 opacity-50" />
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Aún no tengo recuerdos guardados sobre este tema.
            </p>
          </div>
        ) : (
          filtered.map((memory, i) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group p-4 rounded-xl transition-all hover:scale-[1.01] cursor-pointer"
              style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
                    {memory.content}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'var(--surface-secondary)', color: 'var(--text-secondary)' }}>
                      {memory.type}
                    </span>
                    <span className="text-[10px] flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
                      <Clock size={10} /> {memory.date}
                    </span>
                    <span className="text-[10px]" style={{ color: importanceColors[memory.importance] }}>
                      ● {memory.importance}
                    </span>
                    <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                      vía {memory.source}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {memory.pinned && <Pin size={12} style={{ color: 'var(--accent)' }} />}
                  <button className="p-1.5 rounded-lg hover:bg-[var(--surface-hover)]"><Edit3 size={12} style={{ color: 'var(--text-tertiary)' }} /></button>
                  <button className="p-1.5 rounded-lg hover:bg-[var(--surface-hover)]"><ExternalLink size={12} style={{ color: 'var(--text-tertiary)' }} /></button>
                  <button className="p-1.5 rounded-lg hover:bg-[var(--danger-soft)]"><Trash2 size={12} style={{ color: 'var(--danger)' }} /></button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
