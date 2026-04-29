import { motion } from 'framer-motion';

const LadderScreen = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      style={{ textAlign: 'center' }}
    >
      <h1 style={{ color: '#4a4a4a' }}>어떤 선물이 기다리고 있을까요?</h1>
      <p style={{ color: '#888', marginTop: '1rem' }}>운명의 사다리타기!</p>
      
      {/* TODO: 사다리타기 게임 로직 구현 예정 */}
      <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        🛤️ (사다리 게임판 구현 예정)
      </div>
    </motion.div>
  );
};

export default LadderScreen;
