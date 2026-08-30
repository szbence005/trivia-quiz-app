type ScoreProps = {
  score: number;
  currentQuestion: number;
};


function Score({ score, currentQuestion }: ScoreProps) {
  return (
    <div>
        Score: {score} <br></br>
        Failed: {currentQuestion - score} <br></br>
        Current question: {currentQuestion}
    </div>
  );
}

export default Score;