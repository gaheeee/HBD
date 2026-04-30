import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const GIFTS = [
  { id: 1, name: '갤럭시워치⌚️', image: 'watch.jpg' },
  { id: 2, name: '갤럭시워치⌚️', image: 'watch.jpg' },
  { id: 3, name: '갤럭시워치⌚️', image: 'watch.jpg' },
];

// 가로줄 정의 (row: 높이, from: 시작 기둥 인덱스, to: 끝 기둥 인덱스)
const horizontalLines = [
  { row: 1, from: 0, to: 1 },
  { row: 2, from: 1, to: 2 },
  { row: 3, from: 0, to: 1 },
  { row: 4, from: 1, to: 2 },
  { row: 5, from: 0, to: 1 },
];

const LadderScreen = () => {
  const [isMoving, setIsMoving] = useState(false);
  const [result, setResult] = useState<typeof GIFTS[0] | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [path, setPath] = useState<{ x: number, y: number }[]>([]);

  // 경로 계산 로직
  const calculatePath = (startIdx: number) => {
    let currentX = startIdx;
    const points = [{ x: startIdx * 100, y: 0 }];

    // 0부터 6번 행까지 내려가면서 가로줄 체크
    for (let r = 1; r <= 6; r++) {
      const yPos = r * 40;
      // 현재 기둥(currentX)에서 연결된 가로줄 찾기
      const line = horizontalLines.find(l => l.row === r && (l.from === currentX || l.to === currentX));

      if (line) {
        // 가로줄이 있으면: 현재 위치에서 해당 높이까지 내려온 후 -> 옆으로 이동
        points.push({ x: currentX * 100, y: yPos });
        currentX = (line.from === currentX) ? line.to : line.from;
        points.push({ x: currentX * 100, y: yPos });
      } else {
        // 가로줄이 없으면: 그냥 해당 높이까지 내려감
        points.push({ x: currentX * 100, y: yPos });
      }
    }
    // 마지막 바닥까지 연결
    points.push({ x: currentX * 100, y: 280 });
    return { points, finalIdx: currentX };
  };

  const handleSelect = (num: number) => {
    if (isMoving || result) return;

    const { points, finalIdx } = calculatePath(num);
    setPath(points);
    setIsMoving(true);

    setTimeout(() => {
      setResult(GIFTS[finalIdx]);
      setIsMoving(false);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.8 } });
    }, 5000);
  };

  const handleReset = () => {
    setResult(null);
    setShowAll(false);
    setPath([]);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.container}>
      <h1 style={styles.title}>운명의 사다리타기😋</h1>
      <p style={styles.subtitle}>ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ</p>
      <p style={styles.subtitle2}>신중하게 골라^^ 나오는게 바로 당신의 생일선물.ㅋ</p>


      <div style={styles.gameBoard}>
        {/* 선택 버튼 */}
        <div style={styles.buttonRow}>
          {[0, 1, 2].map((num) => (
            <motion.button
              key={num}
              whileHover={!isMoving ? { scale: 1.1, y: -5 } : {}}
              onClick={() => handleSelect(num)}
              disabled={isMoving || !!result}
              style={{
                ...styles.selectBtn,
                background: path[0]?.x === num * 100 ? '#ff9a9e' : '#fff',
                color: path[0]?.x === num * 100 ? '#fff' : '#ff9a9e',
              }}
            >
              {num + 1}
            </motion.button>
          ))}
        </div>

        {/* 사다리 판 */}
        <div style={styles.ladderArea}>
          {/* 세로줄 */}
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ ...styles.verticalLine, left: `${i * 100}px` }} />
          ))}

          {/* 가로줄 */}
          {horizontalLines.map((line, i) => (
            <div key={i} style={{
              ...styles.horizontalLine,
              top: `${line.row * 40}px`,
              left: `${line.from * 100}px`
            }} />
          ))}

          {/* 움직이는 포인트 (Path 기반) */}
          <AnimatePresence>
            {isMoving && (
              <motion.div
                initial={{ x: path[0].x - 6, y: 0 }}
                animate={{
                  x: path.map(p => p.x - 6),
                  y: path.map(p => p.y)
                }}
                transition={{ duration: 5, ease: "linear" }}
                style={styles.pointer}
              />
            )}
          </AnimatePresence>

          {/* 두구두구 효과 */}
          <AnimatePresence>
            {isMoving && [1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0.5, 1.2, 0.5],
                  x: [Math.random() * 400 - 200, Math.random() * 400 - 200],
                  y: [Math.random() * 400 - 200, Math.random() * 400 - 200]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
                style={styles.dugudugu}
              >
                두구두구...🥁
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 결과 영역 */}
        <div style={styles.resultRow}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={styles.giftSlot}>
              {result && !isMoving ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#ff9a9e', textAlign: 'center' }}>
                  {GIFTS[i].name}
                </motion.div>
              ) : '?'}
            </div>
          ))}
        </div>
      </div>

      {/* 결과 팝업 */}
      <AnimatePresence>
        {result && !isMoving && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={styles.modalOverlay}>
            <div style={{ ...styles.modal, maxWidth: showAll ? '350px' : '350px' }}>
              {!showAll ? (
                <>
                  <h2 style={{ color: '#ff9a9e' }}>미쳤다;;</h2>
                  <img
                    src={result.image}
                    alt={result.name}
                    style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '15px', margin: '1.5rem 0' }}
                  />
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{result.name}</p>
                  <button onClick={() => setShowAll(true)} style={styles.subBtn}>남은 선물 확인하기</button>
                </>
              ) : (
                <>
                  <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    style={{ color: '#ff9a9e', marginBottom: '1.5rem' }}
                  >
                    응~~ 사실 다 워치야~~<br/>ㅋㅋㅋㅋㅋㅋㅋ알라뷰 💝
                  </motion.h2>
                  <div style={styles.giftGrid}>
                    {GIFTS.map((g, index) => (
                      <motion.div 
                        key={g.id} 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.5, duration: 0.5 }}
                        style={styles.miniGift}
                      >
                        <div style={styles.giftBadge}>{g.id}</div>
                        <img
                          src={g.image}
                          alt={g.name}
                          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px' }}
                        />
                        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{g.name}</p>
                      </motion.div>
                    ))}
                  </div>
                  <button onClick={handleReset} style={styles.retryBtn}>다시 하기</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </motion.div>
  );
};

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 1rem', minHeight: '100vh', width: '100vw' },
  title: { fontSize: '2rem', fontWeight: '800', color: '#4a4a4a', marginBottom: '0.5rem' },
  subtitle: { color: '#999', },
  subtitle2: { color: '#999', marginBottom: '3rem' },
  gameBoard: { position: 'relative', width: '210px' }, // 폭 조절
  buttonRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', width: '210px' },
  selectBtn: { width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #ff9a9e', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' },
  ladderArea: { position: 'relative', height: '280px', width: '204px', margin: '0 auto' },
  verticalLine: { position: 'absolute', top: 0, width: '4px', height: '100%', background: '#eee' },
  horizontalLine: { position: 'absolute', width: '100px', height: '4px', background: '#eee' },
  pointer: { position: 'absolute', width: '16px', height: '16px', background: '#ff9a9e', borderRadius: '50%', boxShadow: '0 0 10px #ff9a9e', zIndex: 10 },
  resultRow: { display: 'flex', justifyContent: 'space-between', marginTop: '2rem', width: '210px' },
  giftSlot: { width: '40px', height: '40px', background: '#fff', borderRadius: '8px', border: '2px dashed #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, backdropFilter: 'blur(5px)' },
  modal: { background: '#fff', padding: '3rem', borderRadius: '2.5rem', textAlign: 'center', width: '90%', maxWidth: '350px' },
  subBtn: { marginTop: '2rem', padding: '0.8rem 1.5rem', borderRadius: '1rem', border: 'none', background: '#f0f0f0', color: '#666', cursor: 'pointer' },
  allGifts: { marginTop: '3rem', padding: '2rem', background: 'rgba(255,255,255,0.6)', borderRadius: '2rem', textAlign: 'center' },
  giftGrid: { display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' },
  miniGift: { position: 'relative', padding: '0.2rem', background: '#fff', borderRadius: '1rem' },
  giftBadge: {
    position: 'absolute',
    top: '5px',
    left: '5px',
    width: '24px',
    height: '24px',
    background: '#ff9a9e',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    zIndex: 1,
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  dugudugu: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    color: '#ff9a9e',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    pointerEvents: 'none',
    zIndex: 5,
    textShadow: '0 0 10px rgba(255,154,158,0.5)',
    whiteSpace: 'nowrap',
  },
  retryBtn: { marginTop: '2rem', border: 'none', background: 'none', color: '#aaa', textDecoration: 'underline', cursor: 'pointer' }
} as const;

export default LadderScreen;
