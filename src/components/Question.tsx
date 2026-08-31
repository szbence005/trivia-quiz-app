import "./Question.css";
import { useState } from "react";
import { getQuestions } from "../services/triviaApi";
import { createQuestion } from "../services/quiz";
import type { TriviaQuestion } from "../services/quiz";

type QuestionProps = {
  setScore: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
};

function Question({
  setScore,
  score,
  currentQuestion,
  setCurrentQuestion,
}: QuestionProps) {
  const [answers, setAnswers] = useState<string[]>([]);
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [lastAnswer, setLastAnswer] = useState<string | null>(null);

  async function handleQuestion() {
    const data = await getQuestions();

    if (data.response_code === 0) {
      const questionObjects = data.results.map(createQuestion);

      setQuestions(questionObjects);
      setCurrentQuestion(0);
      setScore(0);
      setLastAnswer(null);
      setAnswers(shuffleAnswers(questionObjects[0]));
    }
  }

  function handleAnswer(answer: string) {
    const question = questions[currentQuestion];

    if (answer === question.correct_answer) {
      setScore((score) => score + 1);
    }
  }

  function nextQuestion() {
    if (lastAnswer === null) {
      return;
    }

    handleAnswer(lastAnswer);

    const nextQuestionIndex = currentQuestion + 1;

    if (nextQuestionIndex < questions.length) {
      setCurrentQuestion(nextQuestionIndex);
      setAnswers(shuffleAnswers(questions[nextQuestionIndex]));
      setLastAnswer(null);
    } else {
      // Elfogytak a kérdések
      setCurrentQuestion(questions.length);
    }
  }

  function setMark(answer: string) {
    setLastAnswer(answer);
  }

  function shuffleAnswers(question: TriviaQuestion) {
    const answers = [
      question.correct_answer,
      ...question.incorrect_answers,
    ];

    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    return answers;
  }

  // Még nincs kérdés
  if (questions.length === 0) {
    return (
      <div className="question">
        <button onClick={handleQuestion}>
          Get Questions
        </button>
      </div>
    );
  }

  // Vége a kvíznek
  if (currentQuestion >= questions.length) {
    return (
      <div className="question result">
        <h1>Quiz finished! 🎉</h1>

        <h2>Your score</h2>

        <div className="score">
          {score} / {questions.length}
        </div>

        <p>
          You answered {score} question
          {score !== 1 ? "s" : ""} correctly.
        </p>

        <button onClick={handleQuestion}>
          Play again
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="question">
      <button onClick={handleQuestion}>
        Get Questions
      </button>

      <div className="progress">
        Question {currentQuestion + 1} / {questions.length}
      </div>

      <h2>{question.question}</h2>

      <div className="answers">
        {answers.map((answer, index) => (
          <button
            key={index}
            className={
              answer === lastAnswer
                ? "answer selected"
                : "answer"
            }
            style={{
              animationDelay: `${index * 0.07}s`,
            }}
            onClick={() => setMark(answer)}
          >
            {answer}
          </button>
        ))}
      </div>

      <div className="question-buttons">
        <button
          onClick={nextQuestion}
          disabled={lastAnswer === null}
        >
          Next question
        </button>

        <button>
          Give up
        </button>
      </div>
    </div>
  );
}

export default Question;