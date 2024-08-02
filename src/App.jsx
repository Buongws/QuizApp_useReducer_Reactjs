import { useReducer } from "react";
import Main from "./components/Main";
import StartGame from "./components/StartGame";
import GameScreen from "./components/gameScreen/GameScreen";
import EndGame from "./components/EndGame";
import "./index.css";

const initialState = {
  status: "loading",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "start":
      return { status: "active" };
    case "endGame":
      return { status: "end" };
    default:
      return state;
  }
};

function App() {
  const [{ status }, dispatch] = useReducer(reducer, initialState);

  return (
    <Main className="container">
      {status === "loading" && <StartGame dispatch={dispatch} />}
      {status === "active" && <GameScreen dispatch={dispatch} />}
      {status === "end" && <EndGame />}
    </Main>
  );
}

export default App;
