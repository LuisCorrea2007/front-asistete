import { motion } from 'framer-motion';
import { Puzzle, Download, Trash2, RefreshCw, Bot, Shield } from 'lucide-react';
import { useState } from 'react';

const categories = ['Instaladas', 'Disponibles', 'Aprendidas', 'Locales'];

const mockSkills = [
  { id: 1, name: 'Web Browser', description: 'Navegar y extraer información de páginas web', author: 'JARVIS Core', version: '1.2.0', status: 'installed', risk: 'medio', learned: false },
  { id: 2, name: 'Code Analyzer', description: 'Analizar y sugerir mejoras en código fuente', author: 'JARVIS Core', version: '2.0.1', status: 'installed', risk: 'bajo', learned: false },
  { id: 3, name: 'File Organizer', description: 'Clasificar y organizar archivos automáticamente', author: 'JARVIS Core', version: '1.0.3', status: 'installed', risk: 'bajo', learned: true },
  { id: 4, name: 'Email Assistant', description: 'Leer, redactar y enviar correos electrónicos', author: 'Community', version: '0.9.0', status: 'available', risk: 'alto', learned: false },
  { id: 5, name: 'Calendar Sync', description: 'Sincronizar con Google Calendar y Outlook', author: 'Community', version: '1.1.0', status: 'available', risk: 'medio', learned: false },
  { id: 6, name: 'Pattern Recognition', description: 'Detectar patrones en datos y conversaciones', author: 'JARVIS', version: '0.5.0', status: 'installed', risk: 'bajo', learned: true },
  { id: 7, name: 'Image Generator', description: 'Crear imágenes a partir de descripciones', author: 'Community', version: '1.0.0', status: 'available', risk: 'bajo', learned: false },
  { id: 8, name: 'Voice Cloning', description: 'Clonar voz para narración', author: 'Community', version: '0.3.0', status: 'available', risk: 'alto', learned: false },
];

const riskColors: Record<string, string> = {
  bajo: 'var(--success)',
  medio: 'var(--warning)',
  alto: 'var(--danger)',
};

export default function SkillsView() {
  const [activeCategory, setActiveCategory] = useState('Instaladas');

  const filtered = mockSkills.filter(s => {
    if (activeCategory === 'Instaladas') return s.status === 'installed';
    if (activeCategory === 'Disponibles') return s.status === 'available';
    if (activeCategory === 'Aprendidas') return s.learned;
    if (activeCategory === 'Locales') return s.author === 'JARVIS Core';
    return true;
  });

  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
          <Puzzle size={20} style={{ color: 'var(--accent)' }} />
        </div>
        <div>
          <h1 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>Skills</h1>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {mockSkills.filter(s => s.status === 'installed').length} instaladas · {mockSkills.filter(s => s.learned).length} aprendidas
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-1.5 mb-5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-3 py-1.5 rounded-full text-xs transition-all"
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

      {/* Skills grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl transition-all hover:scale-[1.01]"
              style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--surface-secondary)' }}>
                    <Puzzle size={14} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{skill.name}</p>
                    <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>v{skill.version} · {skill.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {skill.learned && (
                    <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px]" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                      <Bot size={9} /> Aprendida
                    </span>
                  )}
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px]" style={{ color: riskColors[skill.risk], background: `${riskColors[skill.risk]}15` }}>
                    <Shield size={9} /> {skill.risk}
                  </span>
                </div>
              </div>
              <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>{skill.description}</p>
              <div className="flex items-center gap-2">
                {skill.status === 'installed' ? (
                  <>
                    <button className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] hover:bg-[var(--surface-hover)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
                      <RefreshCw size={10} /> Actualizar
                    </button>
                    <button className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] hover:bg-[var(--danger-soft)] transition-colors" style={{ color: 'var(--danger)' }}>
                      <Trash2 size={10} /> Desinstalar
                    </button>
                  </>
                ) : (
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-colors" style={{ background: 'var(--accent)', color: '#fff' }}>
                    <Download size={10} /> Instalar
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
