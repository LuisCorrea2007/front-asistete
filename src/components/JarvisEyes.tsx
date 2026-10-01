import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

type JarvisState = 'idle' | 'listening' | 'thinking' | 'working' | 'success' | 'error' | 'sleeping' | 'privacy' | 'alert';

interface JarvisEyesProps {
  state: JarvisState;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: { eye: 10, gap: 28, height: 14 },
  md: { eye: 14, gap: 40, height: 18 },
  lg: { eye: 20, gap: 56, height: 24 },
  xl: { eye: 28, gap: 76, height: 32 },
};

export default function JarvisEyes({ state, size = 'lg', className = '' }: JarvisEyesProps) {
  const [blink, setBlink] = useState(false);
  const dims = sizeMap[size];

  useEffect(() => {
    if (state === 'sleeping') return;
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, [state]);

  const getEyeAnimation = () => {
    switch (state) {
      case 'idle':
        return {
          left: { x: 0, y: 0, scale: 1 },
          right: { x: 0, y: 0, scale: 1 },
        };
      case 'listening':
        return {
          left: { x: 0, y: 0, scale: 1.1 },
          right: { x: 0, y: 0, scale: 1.1 },
        };
      case 'thinking':
        return {
          left: { x: -3, y: -2, scale: 1.05 },
          right: { x: 3, y: 2, scale: 0.95 },
        };
      case 'working':
        return {
          left: { x: 2, y: 0, scale: 1 },
          right: { x: -2, y: 0, scale: 1 },
        };
      case 'success':
        return {
          left: { x: 0, y: -1, scale: 1.08 },
          right: { x: 0, y: -1, scale: 1.08 },
        };
      case 'error':
        return {
          left: { x: -1, y: 2, scale: 0.9 },
          right: { x: 1, y: 2, scale: 0.9 },
        };
      case 'sleeping':
        return {
          left: { x: 0, y: 0, scaleY: 0.1 },
          right: { x: 0, y: 0, scaleY: 0.1 },
        };
      case 'privacy':
        return {
          left: { x: 0, y: 0, scale: 0.7, opacity: 0.5 },
          right: { x: 0, y: 0, scale: 0.7, opacity: 0.5 },
        };
      case 'alert':
        return {
          left: { x: 0, y: -2, scale: 1.15 },
          right: { x: 0, y: -2, scale: 1.15 },
        };
      default:
        return {
          left: { x: 0, y: 0, scale: 1 },
          right: { x: 0, y: 0, scale: 1 },
        };
    }
  };

  const anim = getEyeAnimation();
  const eyeColor = state === 'error' ? 'var(--danger)' : 
                   state === 'success' ? 'var(--success)' :
                   state === 'privacy' ? 'var(--text-tertiary)' :
                   state === 'alert' ? 'var(--warning)' : 'var(--text)';

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Ambient glow */}
      <AnimatePresence>
        {(state === 'listening' || state === 'thinking' || state === 'working') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute rounded-full"
            style={{
              width: dims.gap + dims.eye * 4,
              height: dims.eye * 4,
              background: `radial-gradient(ellipse, ${eyeColor}40, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Eyes container */}
      <div className="relative flex items-center" style={{ gap: dims.gap }}>
        {/* Left eye */}
        <motion.div
          animate={{
            ...anim.left,
            scaleY: blink ? 0.1 : (state === 'sleeping' ? 0.1 : 1),
          }}
          transition={{
            type: 'spring',
            stiffness: state === 'listening' ? 300 : 200,
            damping: 20,
            mass: 0.8,
          }}
          className="relative rounded-full"
          style={{
            width: dims.eye * 1.8,
            height: dims.eye * 2.2,
            background: eyeColor,
            boxShadow: state !== 'sleeping' && state !== 'privacy'
              ? `0 0 ${dims.eye}px ${eyeColor}30, 0 0 ${dims.eye * 2}px ${eyeColor}15`
              : 'none',
          }}
        />

        {/* Right eye */}
        <motion.div
          animate={{
            ...anim.right,
            scaleY: blink ? 0.1 : (state === 'sleeping' ? 0.1 : 1),
          }}
          transition={{
            type: 'spring',
            stiffness: state === 'listening' ? 300 : 200,
            damping: 20,
            mass: 0.8,
            delay: state === 'thinking' ? 0.1 : 0,
          }}
          className="relative rounded-full"
          style={{
            width: dims.eye * 1.8,
            height: dims.eye * 2.2,
            background: eyeColor,
            boxShadow: state !== 'sleeping' && state !== 'privacy'
              ? `0 0 ${dims.eye}px ${eyeColor}30, 0 0 ${dims.eye * 2}px ${eyeColor}15`
              : 'none',
          }}
        />
      </div>

      {/* Listening wave indicator */}
      <AnimatePresence>
        {state === 'listening' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-6 flex items-center gap-[3px]"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{
                  height: [4, 12 + Math.random() * 8, 4],
                }}
                transition={{
                  duration: 0.6 + Math.random() * 0.4,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
                className="w-[3px] rounded-full"
                style={{ background: 'var(--accent)' }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
