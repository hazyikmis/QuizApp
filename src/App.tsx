import React, { useState } from "react";
//import logo from "./logo.svg";
import { fetchQuizQuestions } from "./API";

// components
import { QuestionCard } from "./components/QuestionCard";

// types
import { Difficulty, QuestionState } from "./API";

// styles
import { GlobalStyle, Wrapper } from "./App.styles";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [currentQuestionNr, setCurrentQuestionNr] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  //console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));
  //console.log(questions);

  // useEffect(() => {
  //   const getQuestions = async () => {
  //     const newQuestions = await fetchQuizQuestions(
  //       TOTAL_QUESTIONS,
  //       Difficulty.EASY
  //     );
  //     setQuestions(newQuestions);
  //   };
  //   getQuestions();
  // }, []);

  const getQuestions = async () => {
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
  };

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    await getQuestions();
    setScore(0);
    setUserAnswers([]);
    setCurrentQuestionNr(0);
    setLoading(false);
    //console.log(questions);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correctAnswer = questions[currentQuestionNr].correct_answer;
      const correct = answer === correctAnswer;
      if (correct) setScore((prev) => prev + 1);
      const answerObj = {
        question: questions[currentQuestionNr].question,
        answer,
        correct,
        correctAnswer,
      };
      setUserAnswers((prev) => [...prev, answerObj]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = currentQuestionNr + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setCurrentQuestionNr(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Trivial Quizzz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!gameOver && <p className="score">Score:{score}</p>}
        {loading && <p>Loading Questions...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={currentQuestionNr + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[currentQuestionNr].question}
            answers={questions[currentQuestionNr].answers} //correct_answer + incorrect_answers
            userAnswer={
              userAnswers ? userAnswers[currentQuestionNr] : undefined
            }
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === currentQuestionNr + 1 &&
        currentQuestionNr !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
