import react, { useEffect, useState } from "react";
import axios from "axios";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import NavBar from "./components/Home/NavBar";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  selectUser,
  setUser,
  userState,
} from "./store/userSlice";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Router>
        {!user ? (
          <LoginPage />
        ) : (
          <>
            <NavBar />
            <Routes>
              {/* {!user ? (
            <Route path="/" element={<LoginPage />} />
          ) : (
            <> */}
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              {/* </>
          )} */}
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
