import "./Question.css";
import { useState } from "react";
import { useRef } from "react";
import { getQuestions } from "../services/triviaApi";
import { createQuestion } from "../services/quiz";
import type { TriviaQuestion } from "../services/quiz";

type QuestionProps = {
  setScore: React.Dispatch<React.SetStateAction<number>>;
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
};

function Question({
  setScore,
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
    setAnswers(shuffleAnswers(questionObjects[0]));
  }

  console.log(data);
}

  function handleAnswer(answer: string) {
    const question = questions[currentQuestion];

    if (answer === question.correct_answer) {
      setScore((score) => score + 1);
    }

    
  }
  function nextQuestion() {
  if (lastAnswer !== null) {
    handleAnswer(lastAnswer);

    const nextQuestionIndex = currentQuestion + 1;

    if (nextQuestionIndex < questions.length) {
      setCurrentQuestion(nextQuestionIndex);
      setAnswers(shuffleAnswers(questions[nextQuestionIndex]));
    }

    setLastAnswer(null);
  }
  }

  function setMark(answer: string){
    setLastAnswer(answer);

  }
  function shuffleAnswers(question: TriviaQuestion) {
  const answers = [
    question.correct_answer,
    ...question.incorrect_answers,
  ];

  const randomNumber = Math.floor(Math.random() * 4);

  [answers[0], answers[randomNumber]] = [
    answers[randomNumber],
    answers[0],
  ];

  return answers;
}

  const question = questions[currentQuestion];

  if (!question) {
    return (
      <div className="question">
        <button onClick={handleQuestion}>
          Get Questions
        </button>
      </div>
    );
  }


  return (
    <div className="question">
      <button onClick={handleQuestion}>
        Get Questions
      </button>

      <h2>{question.question}</h2>

      {answers.map((answer, index) => (
        <button
          key={index}
          className={answer === lastAnswer ? "answer selected" : "answer"}
          onClick={() => setMark(answer)}
        >
          {answer}
        </button>
      ))}
      <div>
        <button onClick={nextQuestion} disabled={lastAnswer === null}>Next question</button>
        <button>Give up</button>
      </div>
    </div>
  );
}

export default Question;