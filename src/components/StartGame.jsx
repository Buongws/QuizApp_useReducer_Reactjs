const StartGame = ({ dispatch }) => {
  return (
    <div className="startGame">
      <h1>Welcome to React Quiz Game!</h1>
      <button onClick={() => dispatch({ type: "start" })}>Start Game</button>
    </div>
  );
};

export default StartGame;
