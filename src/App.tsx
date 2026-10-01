import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Onboarding from './components/Onboarding';
import HomeView from './views/Home';
import MemoryView from './views/Memory';
import TasksView from './views/Tasks';
import DevicesView from './views/Devices';
import SmartHomeView from './views/SmartHome';
import SkillsView from './views/Skills';
import SystemView from './views/System';
import ActivityView from './views/Activity';
import ConversationsView from './views/Conversations';
import ResearchView from './views/Research';
import SettingsView from './views/Settings';
import FilesView from './views/Files';
import ChatArea from './components/ChatArea';

type JarvisState = 'idle' | 'listening' | 'thinking' | 'working' | 'success' | 'error' | 'sleeping' | 'privacy' | 'alert';

interface Message {
  id: number;
  role: 'user' | 'jarvis' | 'system';
  content: string;
  cards?: any[];
}

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('home');
  const [jarvisState, setJarvisState] = useState<JarvisState>('idle');
  const [privacyMode, setPrivacyMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState('Luis');
  const [assistantName, setAssistantName] = useState('JARVIS');

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowChat(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault();
        setActiveView('settings');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOnboardingComplete = useCallback((name: string, user: string) => {
    setAssistantName(name);
    setUserName(user);
    setShowOnboarding(false);
  }, []);

  const handleMessage = useCallback((msg: string) => {
    // Add user message
    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      content: msg,
    };
    setMessages(prev => [...prev, userMsg]);
    setShowChat(true);

    // Simulate JARVIS processing
    setJarvisState('thinking');
    setTimeout(() => {
      setJarvisState('working');
      setTimeout(() => {
        setJarvisState('success');

        // Generate contextual response
        let response = '';
        let cards: any[] = [];

        if (msg.toLowerCase().includes('pdf') || msg.toLowerCase().includes('archivo') || msg.toLowerCase().includes('busca')) {
          response = 'Encontré algunos resultados relevantes:';
          cards = [
            { name: 'report-2024.pdf', type: 'Documento PDF', modified: 'Modificado ayer' },
            { name: 'atlas-spec.pdf', type: 'Documento PDF', modified: 'Modificado hace 3 días' },
            { name: 'notas-reunion.pdf', type: 'Documento PDF', modified: 'Modificado hace 1 semana' },
          ];
        } else if (msg.toLowerCase().includes('tarea')) {
          response = 'Tienes 3 tareas pendientes y 2 en progreso. La más urgente es "Deploy API v2.3" con prioridad alta.';
        } else if (msg.toLowerCase().includes('luz') || msg.toLowerCase().includes('casa') || msg.toLowerCase().includes('enciende')) {
          response = 'He encendido las luces de la cocina. ¿Necesitas algo más?';
        } else if (msg.toLowerCase().includes('dispositivo')) {
          response = 'Tienes 4 dispositivos en línea: MacBook Pro, PC Escritorio, iPhone 15 y Raspberry Pi. El iPad está desconectado.';
        } else {
          response = 'Entendido. Estoy procesando tu solicitud. ¿Hay algo más en lo que pueda ayudarte?';
        }

        const jarvisMsg: Message = {
          id: Date.now() + 1,
          role: 'jarvis',
          content: response,
          cards: cards.length > 0 ? cards : undefined,
        };
        setMessages(prev => [...prev, jarvisMsg]);

        // Return to idle after a moment
        setTimeout(() => setJarvisState('idle'), 2000);
      }, 1500);
    }, 800);
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView jarvisState={jarvisState} onMessage={handleMessage} userName={userName} />;
      case 'memory':
        return <MemoryView />;
      case 'tasks':
        return <TasksView />;
      case 'devices':
        return <DevicesView />;
      case 'smart-home':
        return <SmartHomeView />;
      case 'skills':
        return <SkillsView />;
      case 'system':
        return <SystemView />;
      case 'activity':
        return <ActivityView />;
      case 'conversations':
        return <ConversationsView />;
      case 'research':
        return <ResearchView />;
      case 'settings':
        return <SettingsView />;
      case 'files':
        return <FilesView />;
      default:
        return <HomeView jarvisState={jarvisState} onMessage={handleMessage} userName={userName} />;
    }
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ background: 'var(--background)' }}>
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeView={activeView}
        onNavigate={setActiveView}
        privacyMode={privacyMode}
      />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top bar */}
        <header className="h-14 flex items-center justify-between px-6 border-b flex-shrink-0"
          style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-medium capitalize" style={{ color: 'var(--text)' }}>
              {activeView === 'home' ? '' : activeView === 'smart-home' ? 'Casa' : activeView}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Privacy toggle */}
            <button
              onClick={() => {
                setPrivacyMode(!privacyMode);
                if (!privacyMode) setJarvisState('privacy');
                else setJarvisState('idle');
              }}
              className="px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all"
              style={{
                background: privacyMode ? 'var(--warning-soft)' : 'var(--surface)',
                color: privacyMode ? 'var(--warning)' : 'var(--text-secondary)',
                border: `1px solid ${privacyMode ? 'var(--warning)' : 'var(--border-subtle)'}`,
              }}
            >
              {privacyMode ? '🔒 Privado' : '🔓 Normal'}
            </button>
          </div>
        </header>

        {/* View content */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Chat overlay */}
      <ChatArea
        messages={messages}
        isVisible={showChat}
        onClose={() => setShowChat(false)}
      />
    </div>
  );
}

export default App;
