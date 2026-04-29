import { motion } from 'framer-motion';

interface Props {
  onStartGame: () => void;
}

const CelebrationScreen = ({ onStartGame }: Props) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      style={{ textAlign: 'center' }}
    >
      <h1 style={{ fontSize: '3rem', color: '#ff9a9e' }}>🎉 Happy Birthday! 🎉</h1>
      <p style={{ margin: '2rem 0', fontSize: '1.2rem', color: '#666' }}>
        생일을 진심으로 축하해요!<br />
        당신을 위해 준비한 특별한 선물이 있어요.
      </p>
      
      {/* TODO: 여기에 선물 박스 애니메이션 추가 예정 */}
      <div style={{ padding: '4rem', background: '#fff', borderRadius: '2rem', marginBottom: '2rem' }}>
        🎁 (선물 박스 애니메이션이 올 자리)
      </div>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStartGame}
        style={{
          padding: '1rem 2rem',
          borderRadius: '2rem',
          border: 'none',
          background: 'linear-gradient(45deg, #ff9a9e, #fecfef)',
          color: 'white',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        선물 받으러 가기
      </motion.button>
    </motion.div>
  );
};

export default CelebrationScreen;
