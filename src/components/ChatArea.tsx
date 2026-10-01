import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Check, FileText, Lightbulb, ArrowRight } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'jarvis' | 'system';
  content: string;
  type?: 'text' | 'file' | 'action' | 'result';
  cards?: any[];
  timestamp?: string;
}

interface ChatAreaProps {
  messages: Message[];
  isVisible: boolean;
  onClose: () => void;
}

function FileCard({ name, type, modified }: { name: string; type: string; modified: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:scale-[1.02]"
      style={{ background: 'var(--surface-secondary)', border: '1px solid var(--border-subtle)' }}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
        <FileText size={14} style={{ color: 'var(--accent)' }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium truncate" style={{ color: 'var(--text)' }}>{name}</p>
        <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{type} · {modified}</p>
      </div>
      <ArrowRight size={12} style={{ color: 'var(--text-tertiary)' }} />
    </div>
  );
}

function ActionCard({ action, status }: { action: string; status: 'completed' | 'running' | 'pending' }) {
  const colors = {
    completed: 'var(--success)',
    running: 'var(--accent)',
    pending: 'var(--text-tertiary)',
  };
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'var(--surface-secondary)' }}>
      <div className="w-2 h-2 rounded-full" style={{ background: colors[status] }} />
      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{action}</span>
    </div>
  );
}

export default function ChatArea({ messages, isVisible, onClose }: ChatAreaProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-xl z-50"
        >
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
                  <Bot size={12} style={{ color: 'var(--accent)' }} />
                </div>
                <span className="text-xs font-medium" style={{ color: 'var(--text)' }}>JARVIS</span>
              </div>
              <button onClick={onClose} className="text-xs px-2 py-1 rounded" style={{ color: 'var(--text-tertiary)' }}>
                Esc
              </button>
            </div>

            {/* Messages */}
            <div className="max-h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {msg.role !== 'system' && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: msg.role === 'user' ? 'var(--surface-secondary)' : 'var(--accent-soft)' }}>
                      {msg.role === 'user' ? (
                        <User size={12} style={{ color: 'var(--text-secondary)' }} />
                      ) : (
                        <Bot size={12} style={{ color: 'var(--accent)' }} />
                      )}
                    </div>
                  )}
                  <div className={`flex-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                    {msg.role === 'system' ? (
                      <div className="flex items-center gap-2 justify-center py-1">
                        <div className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} />
                        <span className="text-[10px] px-2" style={{ color: 'var(--text-tertiary)' }}>{msg.content}</span>
                        <div className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} />
                      </div>
                    ) : (
                      <>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{msg.content}</p>
                        {msg.cards && msg.cards.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {msg.cards.map((card, j) => (
                              <FileCard key={j} {...card} />
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
