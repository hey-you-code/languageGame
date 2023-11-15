import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setCurrQuestion,
  setGameLanguage,
  setGameState,
  setZeroScore,
} from "../../store/gameSlice";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="flex overflow-hidden  items-center justify-between sticky  h-[60px] w-screen ">
      <div
        // to="/"
        onClick={() => {
          // setOptionChoosen("");
          dispatch(setCurrQuestion(0));
          dispatch(setZeroScore(0));
          dispatch(setGameState("learn"));
          dispatch(setGameLanguage(null));
          navigate("/");
        }}
        className="cursor-pointer px-8"
      >
        <h1 className="text-3xl font-bold text-blue-600 ">
          Language Learning Game
        </h1>
      </div>

      <div className="flex justify-between text-black">
        <div
          // to="/leaderboard"
          className={
            window.location.pathname == "/leaderboard"
              ? "px-8 font-semibold text-2xl text-blue-600 hover:cursor-pointer"
              : "px-8 font-semibold text-2xl hover:text-blue-600 hover:cursor-pointer"
          }
          onClick={() => navigate("/leaderboard")}
        >
          Leaderboard
        </div>
        <div
          // to="/profile"
          className={
            window.location.pathname == "/profile"
              ? "flex px-8 text-blue-600 hover:cursor-pointer"
              : "flex px-8 hover:text-blue-600 hover:cursor-pointer"
          }
          onClick={() => navigate("/profile")}
        >
          <UserCircleIcon className="h-8 w-8" />
          <h1 className=" font-semibold text-2xl">Profile</h1>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
