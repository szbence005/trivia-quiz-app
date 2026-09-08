import "./Score.css";

type ScoreProps = {
  score: number;
  currentQuestion: number;
};

function Score({ score, currentQuestion }: ScoreProps) {
  const failed = Math.max(currentQuestion - score, 0);
  const accuracy =
    currentQuestion > 0 ? Math.round((score / currentQuestion) * 100) : 0;

  return (
    <div className="score-board">
      <div className="score-stats">
        <div className="score-stat score-stat--correct">
          <span className="score-stat-value">{score}</span>
          <span className="score-stat-label">Correct</span>
        </div>

        <div className="score-stat score-stat--failed">
          <span className="score-stat-value">{failed}</span>
          <span className="score-stat-label">Wrong</span>
        </div>

        <div className="score-stat score-stat--accuracy">
          <span className="score-stat-value">{accuracy}%</span>
          <span className="score-stat-label">Accuracy</span>
        </div>
      </div>
    </div>
  );
}

export default Score;