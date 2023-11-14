import React from "react";
import NavBar from "../components/Home/NavBar";
import Learn from "../components/Home/Learn";
import { useSelector } from "react-redux";
import { gameState } from "../store/gameSlice";
import Game from "../components/Home/Game";
import Result from "../components/Home/Result";

function HomePage() {
  const stateOfGame = useSelector(gameState);
  return (
    <div className="h-screen w-screen overflow-hidden">
      {/* NavBar */}

     

      {/* Dashboard */}
      {stateOfGame === "learn" && <Learn />}
      {stateOfGame === "game" && <Game />}
      {stateOfGame === "result" && <Result /> }
    </div>
  );
}

export default HomePage;
