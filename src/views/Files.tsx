import { motion } from 'framer-motion';
import { FolderOpen, File, FileText, Image, Film, Music, Archive, Search, Grid, List } from 'lucide-react';
import { useState } from 'react';

const mockFiles = [
  { id: 1, name: 'Atlas', type: 'folder', modified: 'hace 2h', size: '24 items', icon: FolderOpen },
  { id: 2, name: 'report-2024.pdf', type: 'pdf', modified: 'hace 1 día', size: '2.4 MB', icon: FileText },
  { id: 3, name: 'presentacion.pptx', type: 'doc', modified: 'hace 3 días', size: '8.1 MB', icon: File },
  { id: 4, name: 'screenshot.png', type: 'image', modified: 'ayer', size: '1.2 MB', icon: Image },
  { id: 5, name: 'notas-reunion.md', type: 'text', modified: 'hace 5h', size: '4 KB', icon: FileText },
  { id: 6, name: 'backup.zip', type: 'archive', modified: 'hace 1 semana', size: '156 MB', icon: Archive },
  { id: 7, name: 'demo-video.mp4', type: 'video', modified: 'hace 4 días', size: '45 MB', icon: Film },
  { id: 8, name: 'podcast-ep3.mp3', type: 'audio', modified: 'hace 2 días', size: '32 MB', icon: Music },
];

export default function FilesView() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = mockFiles.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
            <FolderOpen size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <h1 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>Archivos</h1>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{mockFiles.length} elementos</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setViewMode('grid')} className="p-2 rounded-lg transition-colors"
            style={{ background: viewMode === 'grid' ? 'var(--accent-soft)' : 'transparent' }}>
            <Grid size={14} style={{ color: viewMode === 'grid' ? 'var(--accent)' : 'var(--text-tertiary)' }} />
          </button>
          <button onClick={() => setViewMode('list')} className="p-2 rounded-lg transition-colors"
            style={{ background: viewMode === 'list' ? 'var(--accent-soft)' : 'transparent' }}>
            <List size={14} style={{ color: viewMode === 'list' ? 'var(--accent)' : 'var(--text-tertiary)' }} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar archivos..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
        />
      </div>

      {/* Files */}
      <div className="flex-1 overflow-y-auto">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((file, i) => {
              const Icon = file.icon;
              return (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="p-4 rounded-xl text-center cursor-pointer transition-all hover:scale-[1.03] group"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--surface-secondary)' }}>
                    <Icon size={20} style={{ color: 'var(--accent)' }} />
                  </div>
                  <p className="text-xs font-medium truncate" style={{ color: 'var(--text)' }}>{file.name}</p>
                  <p className="text-[10px] mt-1" style={{ color: 'var(--text-tertiary)' }}>{file.size}</p>
                  <p className="text-[9px]" style={{ color: 'var(--text-tertiary)' }}>{file.modified}</p>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-1">
            {filtered.map((file, i) => {
              const Icon = file.icon;
              return (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:bg-[var(--surface-hover)]"
                >
                  <Icon size={16} style={{ color: 'var(--accent)' }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate" style={{ color: 'var(--text)' }}>{file.name}</p>
                  </div>
                  <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{file.size}</span>
                  <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{file.modified}</span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
