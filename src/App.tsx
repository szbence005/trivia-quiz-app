import "./App.css";
import Header from "./components/Header";
import Question from "./components/Question";
import Score from "./components/Score";
import { useState } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <>
      <Header />
      <Question
        score={score}
        setScore={setScore}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
      />
    </>
  );
}

export default App;