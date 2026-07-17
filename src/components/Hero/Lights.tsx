'use client';

import { motion } from 'framer-motion';

interface LightsProps {
  isNight: boolean;
}

// Track light positions measured from reference image (% from left)
const TRACK_LIGHTS = [
  { x: 8, type: 'spot' },
  { x: 18, type: 'spot' },
  { x: 32, type: 'bar' },
  { x: 48, type: 'bar' },
  { x: 63, type: 'spot' },
  { x: 78, type: 'spot' },
  { x: 88, type: 'spot' },
  { x: 95, type: 'spot' },
];

// LED strip positions (under shelves, % from left, width %)
const LED_STRIPS = [
  { x: 68, y: 42, w: 28 },
  { x: 68, y: 58, w: 28 },
  { x: 68, y: 72, w: 28 },
];

export default function Lights({ isNight }: LightsProps) {
  return (
    <div className="store-lights" data-night={isNight}>
      {/* Track rail */}
      <div className="light-track-rail" />

      {/* Track light fixtures */}
      {TRACK_LIGHTS.map((light, i) => (
        <div
          key={i}
          className={`track-light track-light--${light.type}`}
          style={{ left: `${light.x}%` }}
        >
          {/* Fixture body */}
          <div className="track-light__stem" />
          <div className="track-light__head" />

          {/* Glow cone */}
          <motion.div
            className="track-light__glow"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{
              opacity: isNight ? [0.6, 0.85, 0.6] : [0.3, 0.45, 0.3],
              scaleY: 1,
            }}
            transition={{
              opacity: {
                duration: 3.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.15,
              },
              scaleY: {
                duration: 0.8,
                delay: i * 0.15,
                ease: 'easeOut',
              },
            }}
          />
        </div>
      ))}

      {/* LED strips under shelves */}
      {LED_STRIPS.map((strip, i) => (
        <motion.div
          key={`led-${i}`}
          className="led-strip"
          style={{
            left: `${strip.x}%`,
            top: `${strip.y}%`,
            width: `${strip.w}%`,
          }}
          animate={{
            opacity: isNight ? 0.7 : 0.35,
          }}
          transition={{ duration: 1.5 }}
        />
      ))}
    </div>
  );
}
