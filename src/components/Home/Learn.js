import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  gameLanguage,
  gameLevel,
  setGameLanguage,
  setGameLevel,
  setGameState,
} from "../../store/gameSlice";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { currentUsers, selectUser, setUsers } from "../../store/userSlice";

const levels = [
  { value: "2", label: "Level-1" },
  { value: "3", label: "Level-2" },
  { value: "4", label: "Level-3" },
  { value: "5", label: "Level-4" },
  { value: "1", label: "Level-5" },
];

const options = [
  { value: "English", label: "English" },
  { value: "Japanese", label: "Japanese" },
  { value: "Hindi", label: "Hindi" },
  { value: "Chinese", label: "Chinese" },
  { value: "Korean", label: "Korean" },
];

function Learn() {
  const [level, setLevel] = useState(null);
  const dispatch = useDispatch();
  const [exist, setExist] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const currGameLanguage = useSelector(gameLanguage);

  const currentGameLevel = useSelector(gameLevel);

  // const [users, setUsers] = useState([]);
  const users = useSelector(currentUsers);
  const user = useSelector(selectUser);
  const [userExist, setUserExist] = useState(false);

  // useEffect(
  //   () =>
  //     onSnapshot(
  //       query(collection(db, "users"), orderBy("timestamp", "desc")),
  //       (snapshot) => {
  //         dispatch(setUsers(snapshot.docs));
  //       }
  //     ),

  //   [db]
  // );

  // useEffect(
  //   () =>
  //   setUserExist(
  //     users?.findIndex((currUser) => currUser?.id === user?.uid) !== -1
  //     ),
  //   [users]
  // );

  const handleStart = async () => {
    // if (!userExist) {
    await setDoc(
      doc(db, "users", user.uid, selectedOption.label, level.label),
      {
        email: user?.email,
        uid: user?.uid,
        language: selectedOption.label,
        gameLevel: level.label,
        timestamp: serverTimestamp(),
        score: 0,
      }
    );
    dispatch(setGameLevel(level.label));
    dispatch(setGameState("game"));
    console.log("hey game Started!");
    // }
  };

  // console.log(selectedOption);

  const setLanguage = () => {
    // await addDoc(collection(db, "languages", selectedOption.label, "users"), {
    //   email: user?.email,
    //   uid: user?.uid,
    //   language: selectedOption.label,
    //   gameLevel: currentGameLevel,
    //   timestamp: serverTimestamp(),
    //   score: 0,
    // });
    dispatch(setGameLanguage(selectedOption.label));
    setExist(true);
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center">
      <div className="space-y-4">
        <span className="text-5xl font-semibold">
          Start Your Language Learing Journey From this game.....
        </span>
        <div className="w-full flex flex-col space-y-[50px] justify-evenly items-center">
          <div className="w-full">
            {exist == true ? (
              <div className="w-full">
                <h1 className="text-2xl font-semibold">Language Preference</h1>
                <div className="space-x-4 flex justify-between">
                  <span className="text-2xl w-1/2 font-semibold text-blue-600">
                    {currGameLanguage}
                  </span>
                  <button
                    onClick={() => setExist(false)}
                    className="bg-black px-4 md:w-[100px] rounded-sm text-white text-xl"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1>Langauage of the game?</h1>
                <div className="flex justify-between items-center w-full">
                  <Select
                    className="w-1/2"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                  />
                  <button
                    onClick={setLanguage}
                    className="bg-black px-4 rounded-sm text-white text-xl"
                  >
                    Set Language
                  </button>
                </div>
              </>
            )}
          </div>
          {currGameLanguage != null && (
            <div className="w-full flex items-center justify-between">
              <div className=" w-1/2 text-xl  text-blue-600">
                <span className="font-semibold text-blue-600">
                  Select Game level
                </span>
                <Select
                  className=""
                  defaultValue={level}
                  onChange={setLevel}
                  options={levels}
                />
              </div>
              <div>
                {level != null && (
                  <button
                    className="text-white mr-4 text-semibold bg-blue-600 py-2 rounded-full px-4"
                    onClick={handleStart}
                  >
                    Start Game
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Learn;
