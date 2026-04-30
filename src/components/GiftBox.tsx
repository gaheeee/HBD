import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface Props {
  onOpen: () => void;
}

const GiftBox = ({ onOpen }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff9a9e', '#fecfef', '#ffffff', '#ffecd2']
    });

    setTimeout(onOpen, 500);
  };

  return (
    <div style={styles.container} onClick={handleOpen}>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{
              scale: 1,
              y: 0,
              rotate: [0, -3, 3, -3, 3, 0]
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              duration: 0.5
            }}
            whileHover={{ scale: 1.05 }}
            style={styles.boxContainer}
          >
            <motion.div style={styles.lid} />
            <div style={styles.boxBody}>
              <div style={styles.ribbonVertical} />
              <div style={styles.ribbonHorizontal} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={styles.openedMessage}
        >
          <img
            src='we.jpeg'
            alt="Gift"
            style={styles.image}
          />
        </motion.div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '300px',
    height: '300px',
    margin: '0 auto',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainer: {
    position: 'relative',
    width: '120px',
    height: '120px',
  },
  lid: {
    position: 'absolute',
    top: '-15px',
    left: '-5px',
    width: '130px',
    height: '30px',
    background: '#ff9a9e',
    borderRadius: '8px',
    zIndex: 2,
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  boxBody: {
    position: 'absolute',
    bottom: 0,
    width: '120px',
    height: '100px',
    background: '#fecfef',
    borderRadius: '0 0 8px 8px',
    overflow: 'hidden',
    boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
  },
  ribbonVertical: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '25px',
    height: '100%',
    background: '#ff9a9e',
  },
  ribbonHorizontal: {
    position: 'absolute',
    top: '40%',
    width: '100%',
    height: '20px',
    background: '#ff9a9e',
    opacity: 0.3,
  },
  openedMessage: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
    maxWidth: '800px',
    height: 'auto',
    maxHeight: '80vh',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
    objectFit: 'cover',
  },
} as const;

export default GiftBox;
