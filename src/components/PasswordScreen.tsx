import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface Props {
  onAuthenticated: () => void;
}

const PasswordScreen = ({ onAuthenticated }: Props) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const CORRECT_PASSWORD = '0224';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      onAuthenticated();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
      setPassword('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      style={styles.container}
    >
      <div style={styles.card}>
        <div style={styles.iconCircle}>
          <Lock size={32} color="#ff9a9e" />
        </div>
        <h1 style={styles.title}>오늘의 주인공인가요?</h1>
        <p style={styles.subtitle}>비밀번호는 너와 나의 생일 조합 🔒</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <motion.input
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 8자리"
            style={{
              ...styles.input,
              borderColor: error ? '#ff6b6b' : '#eee'
            }}
            maxLength={8}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            style={styles.button}
          >
            입장하기
          </motion.button>
        </form>
        {error && <p style={styles.errorText}>비밀번호가 틀렸어요! 다시 확인해봐요.</p>}
      </div>
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
  },
  card: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    padding: '3rem 2rem',
    borderRadius: '2.5rem',
    boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
    border: '1px solid rgba(255,255,255,0.3)',
    textAlign: 'center',
    width: '90%',
    maxWidth: '400px',
  },
  iconCircle: {
    width: '80px',
    height: '80px',
    background: '#fff',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 1.5rem',
    boxShadow: '0 8px 20px rgba(255, 154, 158, 0.15)',
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: '700',
    marginBottom: '0.6rem',
    color: '#444',
  },
  subtitle: {
    fontSize: '0.95rem',
    color: '#999',
    marginBottom: '2.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  input: {
    padding: '1.2rem',
    borderRadius: '1.2rem',
    border: '2px solid #eee',
    outline: 'none',
    fontSize: '1.2rem',
    textAlign: 'center',
    letterSpacing: '0.6rem',
    backgroundColor: '#fff',
    transition: 'all 0.3s ease',
  },
  button: {
    padding: '1.2rem',
    borderRadius: '1.2rem',
    border: 'none',
    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(255, 154, 158, 0.3)',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: '0.85rem',
    marginTop: '1.2rem',
    fontWeight: '500',
  },
} as const;

export default PasswordScreen;
