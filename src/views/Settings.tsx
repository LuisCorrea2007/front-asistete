import { motion } from 'framer-motion';
import { Settings, User, Brain, Heart, Mic, Cpu, Shield, Key, Monitor, Building2, Puzzle, Code, ChevronRight, Moon, Sun, MonitorSmartphone } from 'lucide-react';
import { useState } from 'react';

const sections = [
  { id: 'profile', label: 'Perfil', icon: User, desc: 'Tu nombre, avatar y preferencias básicas' },
  { id: 'assistant', label: 'Asistente', icon: Brain, desc: 'Nombre, personalidad y comportamiento' },
  { id: 'personality', label: 'Personalidad', icon: Heart, desc: 'Formalidad, humor, empatía, energía' },
  { id: 'voice', label: 'Voz', icon: Mic, desc: 'Voz, velocidad, wake word, sensibilidad' },
  { id: 'ai', label: 'IA', icon: Cpu, desc: 'Motor, modelo, modo de operación' },
  { id: 'memory', label: 'Memoria', icon: Brain, desc: 'Capacidad, retención, privacidad' },
  { id: 'privacy', label: 'Privacidad', icon: Shield, desc: 'Modo privado, datos, cloud' },
  { id: 'permissions', label: 'Permisos', icon: Key, desc: 'Acciones, herramientas, aprobaciones' },
  { id: 'devices', label: 'Dispositivos', icon: Monitor, desc: 'Satélites, conexiones, sincronización' },
  { id: 'home', label: 'Casa', icon: Building2, desc: 'Home Assistant, habitaciones, automatizaciones' },
  { id: 'skills', label: 'Skills', icon: Puzzle, desc: 'Instalación, permisos, marketplace' },
  { id: 'developer', label: 'Desarrollador', icon: Code, desc: 'Logs, API, MCP, debug' },
];

const personalityTraits = [
  { label: 'Formalidad', value: 40 },
  { label: 'Humor', value: 60 },
  { label: 'Empatía', value: 75 },
  { label: 'Energía', value: 55 },
  { label: 'Detalle', value: 45 },
  { label: 'Proactividad', value: 70 },
];

export default function SettingsView() {
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');

  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
          <Settings size={20} style={{ color: 'var(--accent)' }} />
        </div>
        <div>
          <h1 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>Configuración</h1>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Personaliza tu experiencia con JARVIS</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6">
        {/* Theme selector */}
        <div className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}>
          <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Tema</p>
          <div className="flex gap-2">
            {[
              { id: 'dark' as const, icon: Moon, label: 'Oscuro' },
              { id: 'light' as const, icon: Sun, label: 'Claro' },
              { id: 'system' as const, icon: MonitorSmartphone, label: 'Sistema' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all"
                style={{
                  background: theme === t.id ? 'var(--accent-soft)' : 'var(--surface-secondary)',
                  color: theme === t.id ? 'var(--accent)' : 'var(--text-secondary)',
                  border: `1px solid ${theme === t.id ? 'var(--accent)' : 'transparent'}`,
                }}
              >
                <t.icon size={14} /> {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Personality sliders */}
        <div className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Personalidad</p>
            <button className="text-[10px] px-2 py-1 rounded-full" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
              ADAPTIVE
            </button>
          </div>
          <div className="space-y-3">
            {personalityTraits.map((trait) => (
              <div key={trait.label} className="flex items-center gap-3">
                <span className="text-[11px] w-20" style={{ color: 'var(--text-secondary)' }}>{trait.label}</span>
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--surface-secondary)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${trait.value}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: 'var(--accent)' }}
                  />
                </div>
                <span className="text-[10px] w-8 text-right" style={{ color: 'var(--text-tertiary)' }}>{trait.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Config */}
        <div className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}>
          <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Motor de IA</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <span className="text-xs" style={{ color: 'var(--text)' }}>Motor</span>
              <span className="text-xs font-medium" style={{ color: 'var(--accent)' }}>Ollama</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs" style={{ color: 'var(--text)' }}>Modelo</span>
              <span className="text-xs font-medium" style={{ color: 'var(--text)' }}>Qwen3 4B</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs" style={{ color: 'var(--text)' }}>Estado</span>
              <span className="text-xs font-medium" style={{ color: 'var(--success)' }}>● READY</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs" style={{ color: 'var(--text)' }}>Modo</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>AUTO</span>
            </div>
          </div>
        </div>

        {/* Sections list */}
        <div className="rounded-xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}>
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.button
                key={section.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="w-full flex items-center gap-3 p-3.5 transition-all hover:bg-[var(--surface-hover)] border-b last:border-b-0"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--surface-secondary)' }}>
                  <Icon size={14} style={{ color: 'var(--text-secondary)' }} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs font-medium" style={{ color: 'var(--text)' }}>{section.label}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{section.desc}</p>
                </div>
                <ChevronRight size={14} style={{ color: 'var(--text-tertiary)' }} />
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
