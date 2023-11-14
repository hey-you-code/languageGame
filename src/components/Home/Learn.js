import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { gameLanguage, setGameLevel, setGameState } from "../../store/gameSlice";

const options = [
  { value: "2", label: "Level-1" },
  { value: "3", label: "Level-2" },
  { value: "4", label: "Level-3" },
  { value: "5", label: "Level-4" },
  { value: "1", label: "Level-5" },
];

function Learn() {
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();

  const currGameLanguage = useSelector(gameLanguage);

  const handleStart = () => {
    dispatch(setGameLevel(selectedOption.label));
    dispatch(setGameState("game"));
    console.log("hey game Started!");
  };

  console.log(selectedOption);

  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center">
      <div className="space-y-4">
        <span className="text-5xl font-semibold">
          Start Your Language Learing Journey From this game.....
        </span>
        <div className="flex w-full  justify-evenly items-center">
          <div className="w-1/2 text-xl text-blue-600">
            <span className="font-semibold text-blue-600">
              Select Game level
            </span>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
          {selectedOption != null && (
            <button
              className="text-white mr-4 text-semibold bg-blue-600 py-2 rounded-full px-4"
              onClick={handleStart}
            >
              Start Game
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Learn;
