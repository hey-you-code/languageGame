import React, { useEffect, useState } from "react";
import Select from "react-select";
import Table from "../components/LeaderBoard/Table";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { gameLanguage, gameLevel } from "../store/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  leaderboardLanguage,
  leaderboardLevel,
  setLeaderboardLanguage,
  setLeaderboardLevel,
} from "../store/leaderboardSlice";

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
  const currentLanguage = useSelector(leaderboardLanguage);

  const currentLevel = useSelector(leaderboardLevel);
  const [level, setLevel] = useState(currentLevel || null);
  const [language, setLanguage] = useState(currentLanguage || null);
  const [gameUsers, setGameUsers] = useState([]);
  const [tableData, setTableData] = useState([]);
  // const currentGameLevel = useSelector(gameLevel);
  // const currGameLanguage = useSelector(gameLanguage);

  const dispatch = useDispatch();

  useEffect(
    () =>
      onSnapshot(collection(db, "users"), (snapshot) => {
        setGameUsers(snapshot.docs);
      }),
    []
  );

  console.log(gameUsers);

  const showLeaderBoard = async () => {
    for (var i = 0; i < gameUsers.length; i++) {
      const docRef = doc(
        db,
        "users",
        gameUsers[i]?.data()?.uid,
        language.label,
        level.label
      );
      const docSnap = await getDoc(docRef);

      if (
        docSnap.exists() &&
        tableData.findIndex((item) => item.uid === docSnap.data().uid) === -1
      ) {
        setTableData((item) => [...item, docSnap.data()]);
        console.log("docSnap", docSnap.data());
      } else {
        console.log("doesnot exist");
      }
    }

    dispatch(setLeaderboardLanguage(language.label));
    dispatch(setLeaderboardLevel(level.label));
  };

  console.log("tableData", tableData);

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
          <button
            onClick={showLeaderBoard}
            className="border-2 px-4 py-2 mt-4 rounded-xl border-black text-black font-semibold text-2xl"
          >
            Show Leaderboard
          </button>
        </div>
      </div>
      <div className="flex justify-center w-3/4">
        {/* {tableData[0]?.email} */}
        <Table tableData={tableData} />
      </div>
    </div>
  );
}

export default LeaderboardPage;
