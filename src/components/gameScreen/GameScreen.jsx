import { useEffect, useReducer } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./gameScreen.module.css";

const initialState = {
  currentQuestionIndex: 0,
  selectedAnswer: null,
  timeLeft: 90,
  questions: [
    {
      question:
        "Which is the right way of accessing a function fetch() from an h1 element in JSX?",
      answers: [
        "<h1>{fetch()}</h1>",
        "<h1>${fetch()}</h1>",
        "<h1>{fetch}</h1>",
        "<h1>${fetch}</h1>",
      ],
    },
    {
      question: "What is the output of the following code?",
      answers: ["1", "2", "3", "4"],
    },
    {
      question: "What is the output of the following code?",
      answers: ["1", "2", "3", "4"],
    },
    {
      question: "What is the output of the following code?",
      answers: ["1", "2", "3", "4"],
    },
    {
      question: "What is the output of the following code?",
      answers: ["1", "2", "3", "4"],
    },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "selectAnswer":
      return { ...state, selectedAnswer: action.index };
    case "nextQuestion":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        selectedAnswer: null,
      };
    case "prevQuestion":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex - 1,
        selectedAnswer: null,
      };
    case "tick":
      return { ...state, timeLeft: state.timeLeft - 1 };
    default:
      return state;
  }
};

const GameScreen = ({ dispatch }) => {
  const [state, localDispatch] = useReducer(reducer, initialState);
  const { currentQuestionIndex, selectedAnswer, timeLeft, questions } = state;
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => localDispatch({ type: "tick" }), 1000);
      return () => clearTimeout(timer);
    } else {
      dispatch({ type: "endGame" });
    }
  }, [timeLeft, dispatch]);

  const handleAnswerClick = (index) => {
    localDispatch({ type: "selectAnswer", index });
  };

  return (
    <div className={styles.quizContainer}>
      <div className={styles.actions}>
        <button
          className={styles.previous}
          onClick={() => localDispatch({ type: "prevQuestion" })}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button
            className={styles.submit}
            onClick={() => dispatch({ type: "endGame" })}
          >
            Submit
          </button>
        ) : (
          <button
            className={styles.next}
            onClick={() => localDispatch({ type: "nextQuestion" })}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </button>
        )}
      </div>
      <div className={styles.timer}>
        <CircularProgressbar
          value={(timeLeft / 90) * 100}
          text={`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? "0" : ""}${
            timeLeft % 60
          }`}
          styles={buildStyles({
            textColor: "rgb(79, 70, 229)",
            pathColor: "rgb(79, 70, 229)",
            trailColor: "#d6d6d6",
            backgroundColor: "#fff",
          })}
          background
        />
      </div>
      <div className={styles.question}>
        <h2>
          Question {currentQuestionIndex + 1}/{questions.length}
        </h2>
        <p>{currentQuestion.question}</p>
      </div>
      <div className={styles.answers}>
        {currentQuestion.answers.map((answer, index) => (
          <div
            key={index}
            className={`${styles.answer} ${
              selectedAnswer === index ? styles.selected : ""
            }`}
            onClick={() => handleAnswerClick(index)}
          >
            {answer}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameScreen;
