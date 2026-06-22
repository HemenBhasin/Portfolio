import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1500; // 1.5 seconds loading
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));
      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(onComplete, 300);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'var(--bg, #0a0a0a)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text, #f5f5f5)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          fontSize: '14px',
          letterSpacing: '0.3em',
          marginBottom: '32px',
          textTransform: 'uppercase',
          color: 'var(--muted, #878787)'
        }}
      >
        Initializing
      </motion.div>
      
      <div style={{
        width: '240px',
        height: '1px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        position: 'relative'
      }}>
        <motion.div 
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'var(--text, #fff)',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.03 }}
        />
      </div>
      
      <motion.div
        style={{
          marginTop: '24px',
          fontSize: '12px',
          color: 'var(--muted, #878787)',
          fontFamily: 'monospace'
        }}
      >
        {Math.round(progress).toString().padStart(3, '0')}%
      </motion.div>
    </motion.div>
  );
}
