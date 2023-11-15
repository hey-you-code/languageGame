import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  score,
  setGameLanguage,
  setGameState,
  setScore,
  setZeroScore,
} from "../../store/gameSlice";

function Result() {
  const gameScore = useSelector(score);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(setGameState("learn"));
    dispatch(setZeroScore(0));
    dispatch(setGameLanguage(null));
  };
  return (
    <div>
      <div className="text-xl font-sans font-semibold">{gameScore}</div>

      <button
        className="bg-blue-500 text-white text-3xl px-3 py-1 rounded-md"
        onClick={handleSubmit}
      >
        Back to learing....
      </button>
    </div>
  );
}

export default Result;
