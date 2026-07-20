import React, {useState} from 'react';
import styles from './interactive.module.css';

/**
 * Quiz component — dùng trong MDX:
 *
 * <Quiz
 *   question="OSNR tăng 3 dB nghĩa là..."
 *   options={[
 *     {text: 'Công suất tín hiệu gấp đôi so với nhiễu', correct: true, explain: '3 dB ≈ hệ số 2 theo thang tuyến tính.'},
 *     {text: 'Nhiễu gấp đôi', explain: 'Ngược lại — OSNR cao hơn nghĩa tín hiệu vượt nhiễu nhiều hơn.'},
 *   ]}
 * />
 */
export default function Quiz({question, options = [], hint}) {
  const [picked, setPicked] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handlePick = (i) => {
    setPicked(i);
    setRevealed(true);
  };

  const reset = () => {
    setPicked(null);
    setRevealed(false);
  };

  const isCorrect = revealed && options[picked]?.correct;

  return (
    <div className={styles.quiz}>
      <div className={styles.quizHeader}>
        <span className={styles.quizBadge}>Quiz</span>
        <span className={styles.quizQuestion}>{question}</span>
      </div>
      <div className={styles.quizOptions}>
        {options.map((opt, i) => {
          let cls = styles.quizOption;
          if (revealed) {
            if (opt.correct) cls += ' ' + styles.quizCorrect;
            else if (i === picked) cls += ' ' + styles.quizWrong;
            else cls += ' ' + styles.quizDim;
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => handlePick(i)}
              disabled={revealed}
              type="button"
            >
              <span className={styles.quizMark}>
                {revealed && opt.correct ? '✓' : revealed && i === picked ? '✕' : String.fromCharCode(65 + i)}
              </span>
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>

      {!revealed && hint && <p className={styles.quizHint}>Gợi ý: {hint}</p>}

      {revealed && (
        <div className={isCorrect ? styles.quizFeedbackOk : styles.quizFeedbackNo}>
          <strong>{isCorrect ? 'Chính xác!' : 'Chưa đúng.'}</strong>{' '}
          {options[picked]?.explain ||
            (isCorrect ? 'Bạn đã hiểu đúng ý.' : 'Xem lại phần lý thuyết phía trên.')}
          {!isCorrect && (
            <div className={styles.quizAnswer}>
              Đáp án đúng: <strong>{options.find((o) => o.correct)?.text}</strong>
              {options.find((o) => o.correct)?.explain
                ? ' — ' + options.find((o) => o.correct).explain
                : ''}
            </div>
          )}
          <button className={styles.quizReset} onClick={reset} type="button">
            Thử lại
          </button>
        </div>
      )}
    </div>
  );
}
