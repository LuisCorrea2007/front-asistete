import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, Paperclip, X, Square } from 'lucide-react';

interface CommandBarProps {
  placeholder?: string;
  onSubmit: (message: string) => void;
  jarvisState: string;
  onCancel?: () => void;
}

export default function CommandBar({
  placeholder = 'Escribe o habla con JARVIS...',
  onSubmit,
  jarvisState,
  onCancel,
}: CommandBarProps) {
  const [value, setValue] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isWorking = jarvisState === 'working' || jarvisState === 'thinking';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isWorking) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onSubmit(`[Archivo: ${files[0].name}]`);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.form
        onSubmit={handleSubmit}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        animate={{
          scale: isDragging ? 1.02 : 1,
        }}
        className="relative"
      >
        {/* Drop zone overlay */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl border-2 border-dashed"
              style={{
                background: 'var(--accent-soft)',
                borderColor: 'var(--accent)',
              }}
            >
              <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                Soltar archivo para analizar
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className="flex items-center gap-2 px-4 py-3 rounded-2xl transition-all"
          style={{
            background: 'var(--surface)',
            border: `1px solid ${isDragging ? 'var(--accent)' : 'var(--border)'}`,
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {/* Attach button */}
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors flex-shrink-0"
            title="Adjuntar archivo"
          >
            <Paperclip size={18} style={{ color: 'var(--text-tertiary)' }} />
          </button>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-[var(--text-tertiary)]"
            style={{ color: 'var(--text)' }}
            disabled={isWorking}
          />

          {/* Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {isWorking ? (
              <motion.button
                type="button"
                onClick={onCancel}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg transition-colors"
                style={{ background: 'var(--danger-soft)' }}
                title="Cancelar"
              >
                <Square size={16} style={{ color: 'var(--danger)' }} />
              </motion.button>
            ) : (
              <>
                {/* Mic button */}
                <motion.button
                  type="button"
                  onClick={() => setIsListening(!isListening)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening ? 'bg-[var(--accent-soft)]' : 'hover:bg-[var(--surface-hover)]'
                  }`}
                  title="Hablar con JARVIS"
                >
                  <Mic
                    size={18}
                    style={{ color: isListening ? 'var(--accent)' : 'var(--text-tertiary)' }}
                  />
                </motion.button>

                {/* Send button */}
                <motion.button
                  type="submit"
                  disabled={!value.trim()}
                  whileHover={value.trim() ? { scale: 1.05 } : {}}
                  whileTap={value.trim() ? { scale: 0.95 } : {}}
                  className="p-2 rounded-lg transition-all"
                  style={{
                    background: value.trim() ? 'var(--accent)' : 'transparent',
                    opacity: value.trim() ? 1 : 0.4,
                  }}
                  title="Enviar"
                >
                  <Send size={16} style={{ color: '#fff' }} />
                </motion.button>
              </>
            )}
          </div>
        </div>

        {/* Shortcut hint */}
        <div className="flex items-center justify-center mt-2 gap-1">
          <kbd className="px-1.5 py-0.5 text-[10px] rounded"
            style={{ background: 'var(--surface-secondary)', color: 'var(--text-tertiary)', border: '1px solid var(--border-subtle)' }}>
            ⌘K
          </kbd>
          <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
            para enfocar
          </span>
        </div>
      </motion.form>
    </div>
  );
}
