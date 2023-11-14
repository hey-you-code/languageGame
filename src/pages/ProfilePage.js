import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { currentUsers, login, logout, selectUser } from "../store/userSlice";
import Select from "react-select";
import {
  gameLanguage,
  gameLevel,
  score,
  setGameLanguage,
} from "../store/gameSlice";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const options = [
  { value: "English", label: "English" },
  { value: "Japanese", label: "Japanese" },
  { value: "Hindi", label: "Hindi" },
  { value: "Chinese", label: "Chinese" },
  { value: "Korean", label: "Korean" },
];

function ProfilePage() {
  const gameScore = useSelector(score);
  const dispatch = useDispatch();
  const currentGameLevel = useSelector(gameLevel);
  const currGameLanguage = useSelector(gameLanguage);
  // const [users, setUsers] = useState([]);
  const users = useSelector(currentUsers);
  const user = useSelector(selectUser);
  const [selectedOption, setSelectedOption] = useState(null);
  const [exist, setExist] = useState(false);

  console.log(currGameLanguage);

  const setLanguage = async () => {
    await addDoc(collection(db, "languages", selectedOption.label, "users"), {
      email: user?.email,
      uid: user?.uid,
      language: selectedOption.label,
      gameLevel: currentGameLevel,
      timestamp: serverTimestamp(),
      score: 0,
    });
    dispatch(setGameLanguage(selectedOption.label));
    setExist(true);
  };

  const signout = async () => {
    try {
      await signOut(auth);
      // dispatch(logout());
    } catch (err) {
      console.error(err);
    }

    // dispatch(logout());
    // window.location.reload(false);
  };
  return (
    <div>
      <div className="h-screen w-screen flex justify-center space-y-4 p-4 m-4">
        <div className="w-1/2 rounded-xl space-y-4 p-4 ">
          <div className="space-x-2 flex justify-between w-full">
            <span className="font-semibold text-3xl ">
              {user?.email.split("@")[0]}
            </span>

            <div>
              <Link
                className="border-2 py-2 px-4 rounded-full border-blue-500 text-blue-600 text-2xl font-semibold"
                onClick={signout}
              >
                Sign Out
              </Link>
            </div>
          </div>
          <div className="bg-black h-1 w-full"></div>
          <div className="mt-4 w-full h-screen">
            {currGameLanguage != null && exist == true ? (
              <div>
                <h1 className="text-2xl font-semibold">Language Preference</h1>
                <div className="space-x-4 flex justify-between">
                  <span className="text-2xl font-semibold text-blue-600">
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
                <div className="flex justify-between w-full">
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
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
