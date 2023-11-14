import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  currQuestion,
  gameLanguage,
  gameLevel,
  score,
  setCurrQuestion,
  setGameState,
  setNextQuestion,
  setPrevQuestion,
  setScore,
  setZeroScore,
} from "../../store/gameSlice";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { currentUsers, selectUser, setUsers } from "../../store/userSlice";

const questions = [
  {
    question: "What part of speech do you know?",
    optionA: "Noun",
    optionB: "Verb",
    optionC: "Adjective",
    optionD: "Adverb",
    answer: "A",
  },
  {
    question: "How ?",
    optionA: "A",
    optionB: "B",
    optionC: "C",
    optionD: "D",
    answer: "A",
  },
];

function Game() {
  const currentQuestion = useSelector(currQuestion);
  const gameScore = useSelector(score);
  const dispatch = useDispatch();
  const currentGameLevel = useSelector(gameLevel);
  const currGameLanguage = useSelector(gameLanguage);
  // const [users, setUsers] = useState([]);
  const users = useSelector(currentUsers);
  const user = useSelector(selectUser);
  const [userExist, setUserExist] = useState(false);

  const [optionChoosen, setOptionChoosen] = useState("");

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "languages", "English"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          dispatch(setUsers(snapshot.docs));
        }
      ),

    [db]
  );

  // useEffect(
  //   () =>
  //   setUserExist(
  //     users?.findIndex((currUser) => currUser?.id === user?.uid) !== -1
  //     ),
  //   [users]
  // );

  const nextQuestion = () => {
    dispatch(setNextQuestion());
    if (questions[currentQuestion].answer == optionChoosen) {
      dispatch(setScore());
    }
    setOptionChoosen("");
  };

  const handleSubmit = async () => {
    if (questions[currentQuestion].answer == optionChoosen) {
      dispatch(setScore());
    }
    setOptionChoosen("");

    dispatch(setGameState("result"));
    dispatch(setCurrQuestion(0));

    if (!userExist) {
      await addDoc(collection(db, "users"), {
        email: user?.email,
        uid: user?.uid,
        language: currGameLanguage,
        gameLevel: currentGameLevel,
        timestamp: serverTimestamp(),
        score: gameScore,
      });
    }
  };

  console.log(optionChoosen);
  return (
    <div className="h-screen w-screen flex flex-col  items-center my-4 ">
      {users.map((item) => (
        <div>{item.id}</div>
        
      ))}
      <ChevronLeftIcon
        onClick={() => {
          setOptionChoosen("");
          dispatch(setCurrQuestion(0));
          dispatch(setZeroScore(0));
          dispatch(setGameState("learn"));
        }}
        class="h-10 w-10 absolute left-8 font-bold cursor-pointer text-blue-600"
      />
      <div className="w-3/4 flex justify-between text-xl px-4 font-semibold ">
        <div className="text-2xl">{currentGameLevel}</div>
        <div className="text-2xl">Learn</div>
        <div className="text-2xl">{currGameLanguage}</div>
      </div>

      <div className="h-2/3 w-2/3  py-4  rounded-xl shadow-lg">
        <div className="my-4">
          <h1 className="text-4xl px-4 my-4 py-2">
            {questions[currentQuestion]?.question}
          </h1>
        </div>
        <div className="space-y-4 pl-4 mt-4">
          <div
            className={
              optionChoosen == "A"
                ? "text-white text-2xl p-2 mx-4 bg-black rounded-full cursor-pointer"
                : "text-black text-2xl p-2 mx-4 bg-gray-200 rounded-full cursor-pointer"
            }
            onClick={() => {
              setOptionChoosen("A");
            }}
          >
            {questions[currentQuestion]?.optionA}
          </div>
          <div
            className={
              optionChoosen == "B"
                ? "text-white text-2xl p-2 mx-4 bg-black rounded-full cursor-pointer"
                : "text-black text-2xl p-2 mx-4 bg-gray-200 rounded-full cursor-pointer"
            }
            onClick={() => setOptionChoosen("B")}
          >
            {questions[currentQuestion]?.optionB}
          </div>
          <div
            className={
              optionChoosen == "C"
                ? "text-white text-2xl p-2 mx-4 bg-black rounded-full cursor-pointer"
                : "text-black text-2xl p-2 mx-4 bg-gray-200 rounded-full cursor-pointer"
            }
            onClick={() => setOptionChoosen("C")}
          >
            {questions[currentQuestion]?.optionC}
          </div>
          <div
            className={
              optionChoosen == "D"
                ? "text-white text-2xl p-2 mx-4 bg-black rounded-full cursor-pointer"
                : "text-black text-2xl p-2 mx-4 bg-gray-200 rounded-full cursor-pointer"
            }
            onClick={() => setOptionChoosen("D")}
          >
            {questions[currentQuestion]?.optionD}
          </div>
        </div>
      </div>
      <div className="flex justify-between px-4 w-2/3 mt-4">
        {/* {currentQuestion == !0 && (
          <button
            onClick={() => {
              dispatch(setPrevQuestion());
            }}
            className="bg-green-500 text-white text-3xl px-3 py-1 rounded-md"
          >
            Previous
          </button>
        )} */}
        <div></div>

        {currentQuestion == questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="bg-red-500 text-white text-3xl px-3 py-1 rounded-md"
          >
            Finish
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="bg-blue-500 text-white text-3xl px-3 py-1 rounded-md"
          >
            Next
          </button>
        )}
      </div>
      {gameScore}
    </div>
  );
}

export default Game;
