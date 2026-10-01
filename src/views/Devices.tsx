import { motion } from 'framer-motion';
import { Monitor, Smartphone, Tablet, Wifi, Cpu, HardDrive, Battery, MoreHorizontal } from 'lucide-react';

const mockDevices = [
  { id: 1, name: 'MacBook Pro', type: 'laptop', status: 'online', cpu: 22, ram: 61, battery: 76, lastActive: 'Ahora', icon: '💻' },
  { id: 2, name: 'PC Escritorio', type: 'desktop', status: 'online', cpu: 45, ram: 78, battery: null, lastActive: 'Ahora', icon: '🖥️' },
  { id: 3, name: 'iPhone 15', type: 'phone', status: 'online', cpu: 12, ram: 44, battery: 89, lastActive: 'hace 5m', icon: '📱' },
  { id: 4, name: 'iPad Air', type: 'tablet', status: 'offline', cpu: 0, ram: 0, battery: 23, lastActive: 'hace 2h', icon: '📲' },
  { id: 5, name: 'Raspberry Pi', type: 'satellite', status: 'online', cpu: 8, ram: 35, battery: null, lastActive: 'Ahora', icon: '🔧' },
];

export default function DevicesView() {
  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
          <Monitor size={20} style={{ color: 'var(--accent)' }} />
        </div>
        <div>
          <h1 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>Dispositivos</h1>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {mockDevices.filter(d => d.status === 'online').length} en línea · {mockDevices.length} total
          </p>
        </div>
      </div>

      {/* Device grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {mockDevices.map((device, i) => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-xl transition-all hover:scale-[1.01] cursor-pointer group"
              style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{device.icon}</span>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{device.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: device.status === 'online' ? 'var(--success)' : 'var(--text-tertiary)' }} />
                      <span className="text-[10px] uppercase tracking-wider" style={{ color: device.status === 'online' ? 'var(--success)' : 'var(--text-tertiary)' }}>
                        {device.status}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-[var(--surface-hover)] transition-all">
                  <MoreHorizontal size={14} style={{ color: 'var(--text-tertiary)' }} />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center p-2 rounded-lg" style={{ background: 'var(--surface-secondary)' }}>
                  <Cpu size={12} style={{ color: 'var(--text-tertiary)' }} className="mb-1" />
                  <span className="text-xs font-medium" style={{ color: 'var(--text)' }}>{device.cpu}%</span>
                  <span className="text-[9px]" style={{ color: 'var(--text-tertiary)' }}>CPU</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg" style={{ background: 'var(--surface-secondary)' }}>
                  <HardDrive size={12} style={{ color: 'var(--text-tertiary)' }} className="mb-1" />
                  <span className="text-xs font-medium" style={{ color: 'var(--text)' }}>{device.ram}%</span>
                  <span className="text-[9px]" style={{ color: 'var(--text-tertiary)' }}>RAM</span>
                </div>
                {device.battery !== null ? (
                  <div className="flex flex-col items-center p-2 rounded-lg" style={{ background: 'var(--surface-secondary)' }}>
                    <Battery size={12} style={{ color: device.battery > 20 ? 'var(--success)' : 'var(--danger)' }} className="mb-1" />
                    <span className="text-xs font-medium" style={{ color: 'var(--text)' }}>{device.battery}%</span>
                    <span className="text-[9px]" style={{ color: 'var(--text-tertiary)' }}>Battery</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center p-2 rounded-lg" style={{ background: 'var(--surface-secondary)' }}>
                    <Wifi size={12} style={{ color: 'var(--success)' }} className="mb-1" />
                    <span className="text-xs font-medium" style={{ color: 'var(--text)' }}>OK</span>
                    <span className="text-[9px]" style={{ color: 'var(--text-tertiary)' }}>Red</span>
                  </div>
                )}
              </div>

              <p className="text-[10px] mt-3" style={{ color: 'var(--text-tertiary)' }}>
                Última actividad: {device.lastActive}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
