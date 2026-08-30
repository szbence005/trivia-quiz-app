import "./Question.css";
import { useState } from "react";
import { getQuestions } from "../services/triviaApi";
import { createQuestion } from "../services/quiz";
import type { TriviaQuestion } from "../services/quiz";

function Question() {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  async function handleQuestion() {
    const data = await getQuestions();

    if (data.response_code === 0) {
      const questionObjects = data.results.map(createQuestion);

      setQuestions(questionObjects);
      setCurrentQuestion(0);
    }

    console.log(data);
  }

  function handleAnswer(answer: string) {
    const question = questions[currentQuestion];

    if (answer === question.correct_answer) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  const question = questions[currentQuestion];

  return (
    <div className="question">
      <button onClick={handleQuestion}>
        Get Questions
      </button>

      {question && (
        <>
          <h2>{question.question}</h2>

          <button onClick={() => handleAnswer(question.correct_answer)}>
            {question.correct_answer}
          </button>

          <button onClick={() => handleAnswer(question.incorrect_answers[0])}>
            {question.incorrect_answers[0]}
          </button>

          <button onClick={() => handleAnswer(question.incorrect_answers[1])}>
            {question.incorrect_answers[1]}
          </button>

          <button onClick={() => handleAnswer(question.incorrect_answers[2])}>
            {question.incorrect_answers[2]}
          </button>
        </>
      )}
    </div>
  );
}

export default Question;