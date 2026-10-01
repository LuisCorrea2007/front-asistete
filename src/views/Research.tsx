import { motion } from 'framer-motion';
import { Search, FileText, Globe, Clock, ChevronRight, Plus } from 'lucide-react';

const mockResearch = [
  {
    id: 1,
    title: 'Patrones de diseño para APIs REST',
    status: 'completed',
    date: '2024-01-15',
    sources: 5,
    documents: 2,
    conclusion: 'Los patrones más relevantes son: Repository, CQRS y Event Sourcing para tu caso de uso.',
  },
  {
    id: 2,
    title: 'Comparativa frameworks frontend 2024',
    status: 'in_progress',
    date: '2024-01-14',
    sources: 8,
    documents: 0,
    conclusion: '',
  },
  {
    id: 3,
    title: 'Mejores prácticas de seguridad en Python',
    status: 'completed',
    date: '2024-01-10',
    sources: 12,
    documents: 3,
    conclusion: 'Implementar validación de inputs, usar environment variables y mantener dependencias actualizadas.',
  },
];

export default function ResearchView() {
  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
            <Search size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <h1 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>Investigación</h1>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{mockResearch.length} investigaciones</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all hover:scale-105"
          style={{ background: 'var(--accent)', color: '#fff' }}>
          <Plus size={14} /> Nueva
        </button>
      </div>

      {/* Research list */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {mockResearch.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search size={32} style={{ color: 'var(--text-tertiary)' }} className="mb-3 opacity-50" />
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Todavía no has iniciado ninguna investigación.
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
              Pide a JARVIS que investigue algo y aparecerá aquí.
            </p>
          </div>
        ) : (
          mockResearch.map((research, i) => (
            <motion.div
              key={research.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-xl transition-all hover:scale-[1.01] cursor-pointer group"
              style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{research.title}</p>
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: research.status === 'completed' ? 'var(--success-soft)' : 'var(--accent-soft)',
                        color: research.status === 'completed' ? 'var(--success)' : 'var(--accent)',
                      }}>
                      {research.status === 'completed' ? 'Completada' : 'En progreso'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
                      <Clock size={9} /> {research.date}
                    </span>
                    <span className="text-[10px] flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
                      <Globe size={9} /> {research.sources} fuentes
                    </span>
                    <span className="text-[10px] flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
                      <FileText size={9} /> {research.documents} docs
                    </span>
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-tertiary)' }} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              {research.conclusion && (
                <p className="text-xs leading-relaxed px-3 py-2 rounded-lg" style={{ background: 'var(--surface-secondary)', color: 'var(--text-secondary)' }}>
                  {research.conclusion}
                </p>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
