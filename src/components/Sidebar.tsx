import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, MessageSquare, Brain, CheckSquare, Search, FolderOpen,
  Monitor, Building2, Puzzle, Activity, Server, Settings, ChevronLeft,
  ChevronRight, Shield, Zap
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeView: string;
  onNavigate: (view: string) => void;
  privacyMode: boolean;
}

const navItems = [
  { id: 'home', label: 'Inicio', icon: Home },
  { id: 'conversations', label: 'Conversaciones', icon: MessageSquare },
  { id: 'memory', label: 'Memoria', icon: Brain },
  { id: 'tasks', label: 'Tareas', icon: CheckSquare },
  { id: 'research', label: 'Investigación', icon: Search },
  { id: 'files', label: 'Archivos', icon: FolderOpen },
  { id: 'devices', label: 'Dispositivos', icon: Monitor },
  { id: 'smart-home', label: 'Casa', icon: Building2 },
  { id: 'skills', label: 'Skills', icon: Puzzle },
  { id: 'activity', label: 'Actividad', icon: Activity },
  { id: 'system', label: 'Sistema', icon: Server },
  { id: 'settings', label: 'Configuración', icon: Settings },
];

export default function Sidebar({ collapsed, onToggle, activeView, onNavigate, privacyMode }: SidebarProps) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="relative h-full flex flex-col border-r"
      style={{
        background: 'var(--background-secondary)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Logo area */}
      <div className="flex items-center h-14 px-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <motion.div
          animate={{ scale: collapsed ? 1 : 0.85 }}
          className="flex items-center gap-2.5 overflow-hidden"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--accent-soft)' }}>
            <Zap size={16} style={{ color: 'var(--accent)' }} />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="font-semibold text-sm whitespace-nowrap"
                style={{ color: 'var(--text)' }}
              >
                JARVIS
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Privacy indicator */}
      <AnimatePresence>
        {privacyMode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mx-3 mt-3 px-3 py-2 rounded-lg flex items-center gap-2"
              style={{ background: 'var(--warning-soft)' }}>
              <Shield size={12} style={{ color: 'var(--warning)' }} />
              {!collapsed && (
                <span className="text-[11px] font-medium" style={{ color: 'var(--warning)' }}>
                  Modo Privado
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors w-full text-left ${
                  isActive ? '' : 'hover:bg-[var(--surface-hover)]'
                }`}
                style={{
                  background: isActive ? 'var(--accent-soft)' : 'transparent',
                }}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  size={18}
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    flexShrink: 0,
                  }}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[13px] whitespace-nowrap overflow-hidden"
                      style={{
                        color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                        fontWeight: isActive ? 500 : 400,
                      }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                    style={{ background: 'var(--accent)' }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* Toggle button */}
      <div className="p-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors"
          aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          {collapsed ? (
            <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
          ) : (
            <ChevronLeft size={16} style={{ color: 'var(--text-secondary)' }} />
          )}
        </button>
      </div>
    </motion.aside>
  );
}
