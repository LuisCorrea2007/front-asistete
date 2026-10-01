import { motion } from 'framer-motion';
import { Lightbulb, Thermometer, Tv, Plug, Eye, Wind, Power } from 'lucide-react';
import { useState } from 'react';

interface SmartDevice {
  id: number;
  name: string;
  type: string;
  room: string;
  state: boolean;
  value?: string | number;
  icon: typeof Lightbulb;
}

const rooms = ['Todas', 'Cocina', 'Sala', 'Dormitorio', 'Baño'];

const mockSmartDevices: SmartDevice[] = [
  { id: 1, name: 'Luz principal', type: 'light', room: 'Cocina', state: true, icon: Lightbulb },
  { id: 2, name: 'Tira LED', type: 'light', room: 'Cocina', state: false, icon: Lightbulb },
  { id: 3, name: 'Temperatura', type: 'sensor', room: 'Cocina', state: true, value: '24°C', icon: Thermometer },
  { id: 4, name: 'Luz ambiente', type: 'light', room: 'Sala', state: true, icon: Lightbulb },
  { id: 5, name: 'Smart TV', type: 'tv', room: 'Sala', state: false, icon: Tv },
  { id: 6, name: 'Aire acondicionado', type: 'climate', room: 'Sala', state: true, value: '22°C', icon: Wind },
  { id: 7, name: 'Enchufe PC', type: 'plug', room: 'Sala', state: true, icon: Plug },
  { id: 8, name: 'Luz nocturna', type: 'light', room: 'Dormitorio', state: false, icon: Lightbulb },
  { id: 9, name: 'Cortinas', type: 'cover', room: 'Dormitorio', state: true, value: '80%', icon: Power },
  { id: 10, name: 'Sensor movimiento', type: 'sensor', room: 'Dormitorio', state: true, value: 'Sin movimiento', icon: Eye },
  { id: 11, name: 'Luz espejo', type: 'light', room: 'Baño', state: false, icon: Lightbulb },
  { id: 12, name: 'Ventilador', type: 'climate', room: 'Baño', state: false, icon: Wind },
];

export default function SmartHomeView() {
  const [activeRoom, setActiveRoom] = useState('Todas');
  const [devices, setDevices] = useState(mockSmartDevices);

  const filtered = activeRoom === 'Todas' ? devices : devices.filter(d => d.room === activeRoom);

  const toggleDevice = (id: number) => {
    setDevices(devices.map(d => d.id === id ? { ...d, state: !d.state } : d));
  };

  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
          <Lightbulb size={20} style={{ color: 'var(--accent)' }} />
        </div>
        <div>
          <h1 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>Casa</h1>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {devices.filter(d => d.state).length} dispositivos activos
          </p>
        </div>
      </div>

      {/* Room filters */}
      <div className="flex gap-1.5 mb-5">
        {rooms.map((room) => (
          <button
            key={room}
            onClick={() => setActiveRoom(room)}
            className="px-3 py-1.5 rounded-full text-xs transition-all"
            style={{
              background: activeRoom === room ? 'var(--accent-soft)' : 'var(--surface)',
              color: activeRoom === room ? 'var(--accent)' : 'var(--text-secondary)',
              border: `1px solid ${activeRoom === room ? 'var(--accent)' : 'var(--border-subtle)'}`,
            }}
          >
            {room}
          </button>
        ))}
      </div>

      {/* Devices grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map((device, i) => {
            const Icon = device.icon;
            return (
              <motion.button
                key={device.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => toggleDevice(device.id)}
                className="p-4 rounded-xl text-left transition-all hover:scale-[1.02]"
                style={{
                  background: device.state ? 'var(--accent-soft)' : 'var(--surface)',
                  border: `1px solid ${device.state ? 'var(--accent)' : 'var(--border-subtle)'}`,
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: device.state ? 'var(--accent)' : 'var(--surface-secondary)' }}>
                    <Icon size={14} style={{ color: device.state ? '#fff' : 'var(--text-tertiary)' }} />
                  </div>
                  <div className="w-3 h-3 rounded-full border-2 transition-all"
                    style={{
                      borderColor: device.state ? 'var(--accent)' : 'var(--border)',
                      background: device.state ? 'var(--accent)' : 'transparent',
                    }}
                  />
                </div>
                <p className="text-xs font-medium truncate" style={{ color: 'var(--text)' }}>{device.name}</p>
                <p className="text-[10px] mt-0.5" style={{ color: device.state ? 'var(--accent)' : 'var(--text-tertiary)' }}>
                  {device.state ? (device.value || 'Encendido') : 'Apagado'}
                </p>
                <p className="text-[9px] mt-1" style={{ color: 'var(--text-tertiary)' }}>{device.room}</p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
