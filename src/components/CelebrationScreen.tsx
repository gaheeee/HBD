import { useState } from 'react';
import { motion } from 'framer-motion';
import GiftBox from './GiftBox';

interface Props {
  onStartGame: () => void;
}

const CelebrationScreen = ({ onStartGame }: Props) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, x: -100 }}
      style={styles.container}
    >
      <motion.div
        animate={isOpened ? { y: -20 } : {}}
        style={styles.content}
      >
        <h1 style={styles.title}>
          {isOpened ? "Happy Birthday! ✨" : "선물이 도착했어요!"}
        </h1>
        
        <p style={styles.subtitle}>
          {isOpened 
            ? "당신의 모든 날이 오늘처럼 빛나길 바래요.\n준비한 이벤트를 확인해보세요!" 
            : "박스를 클릭해서 선물을 확인해보세요."}
        </p>

        <div style={styles.boxWrapper}>
          <GiftBox onOpen={() => setIsOpened(true)} />
        </div>

        {isOpened && (
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(255, 154, 158, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartGame}
            style={styles.button}
          >
            선물 받으러 가기
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    padding: '2rem',
  },
  content: {
    textAlign: 'center',
    maxWidth: '500px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#ff9a9e',
    marginBottom: '1rem',
    whiteSpace: 'pre-line',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#888',
    lineHeight: '1.6',
    marginBottom: '3rem',
    whiteSpace: 'pre-line',
  },
  boxWrapper: {
    height: '250px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem',
  },
  button: {
    padding: '1.2rem 2.5rem',
    borderRadius: '2rem',
    border: 'none',
    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 6px 15px rgba(255, 154, 158, 0.2)',
  },
} as const;

export default CelebrationScreen;
