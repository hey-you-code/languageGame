import React, { useState } from "react";
import Select from "react-select";

const levels = [
  { value: "2", label: "Level-1" },
  { value: "3", label: "Level-2" },
  { value: "4", label: "Level-3" },
  { value: "5", label: "Level-4" },
  { value: "1", label: "Level-5" },
];

const languages = [
  { value: "English", label: "English" },
  { value: "Japanese", label: "Japanese" },
  { value: "Hindi", label: "Hindi" },
  { value: "Chinese", label: "Chinese" },
  { value: "Korean", label: "Korean" },
];

function LeaderboardPage() {
  const [level, setLevel] = useState(null);
  const [language, setLanguage] = useState(null);

  return (
    <div className="h-screen w-screen flex">
      <div className="h-screen w-2/12 flex flex-col space-y-4 items-center py-4 mx-4  px-4">
        <div className="w-full grid place-items-center">
          <div className="w-full text-2xl font-semibold justify-center">
            Language
          </div>
          <Select
            className="w-full text-2xl"
            value={language}
            onChange={setLanguage}
            options={languages}
          >
            Language
          </Select>
        </div>
        <div className="w-full grid place-items-center">
          <div className="w-full text-2xl font-semibold justify-center">
            Levels
          </div>
          <Select
            className="w-full text-2xl"
            value={level}
            onChange={setLevel}
            options={levels}
          >
            Levels
          </Select>
        </div>
        <div className="mt-4">
            <button className="border-2 px-4 py-2 mt-4 rounded-xl border-black text-black font-semibold text-2xl">
            Show Leaderboard
            </button>
        </div>
      </div>
    </div>
  );
}

export default LeaderboardPage;
