type Difficulty = "easy" | "medium" | "hard";
type QuestionType = "multiple" | "boolean";

export type TriviaQuestion = {
  category: string;
  type: QuestionType;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

function decodeHtml(text: string): string {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
}

export function createQuestion(data: any): TriviaQuestion {
    return {
        category: decodeHtml(data.category),
        type: data.type,
        difficulty: data.difficulty,
        question: decodeHtml(data.question),
        correct_answer: decodeHtml(data.correct_answer),
        incorrect_answers: data.incorrect_answers.map(decodeHtml),
    };
}