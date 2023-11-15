import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userState } from "../store/userSlice";
import { doc, setDoc } from "firebase/firestore";

function SignUpPage({ setSignUp }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //   const user = useSelector(userState);
  const dispatch = useDispatch();
  //   const [validPassword, setValidPassword] = useState(false);

  //   onAuthStateChanged(auth, (currentUser) => {
  //     dispatch(setUser(currentUser));
  //   });

  const signUp = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (currUser) => {
        console.log(currUser.user);
        await setDoc(doc(db, "users", currUser?.user?.uid), {
          email: email,
          username: email.split("@")[0],
          uid: currUser?.user?.uid,
        });
      })
      .catch((err) => alert(err.message));

    navigate("/");

    // await addDoc(collection(db, "users"), {
    //   email: user?.email,
    //   uid: user?.uid,
    //   language: currGameLanguage,
    //   gameLevel: level.label,
    //   timestamp: serverTimestamp(),
    //   score: 0,
    // });
  };

  console.log(auth?.currentUser?.email);

  return (
    <div className="h-screen flex  w-screen justify-center items-center">
      <div className="space-y-4 flex flex-col w-screen jutsify-center items-center ">
        <h1 className="text-4xl font-extrabold text-blue-600 justify-center ">
          Sign Up
        </h1>
        <div className="flex flex-col space-y-8 pt-[50px] w-1/3">
          {/* <div> */}

          {/* <h1 className="font-semibold text-2xl">Email</h1> */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter Email"
            className="outline-none border-black border-b-2 p-4 text-xl "
          />
          {/* </div> */}

          {/* <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter Username"
            className="outline-none border-black border-b-2 p-4 text-xl "
          /> */}

          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Enter password"
            className="outline-none border-black border-b-2 p-4 text-xl"
          />
          {password.length < 6 && (
            <span className="text-red-500">
              Password should be of minimum 6 character
            </span>
          )}
        </div>
        <div className="w-screen flex justify-center">
          <button
            onClick={signUp}
            className={
              password.length < 6
                ? "bg-gray-200 cursor-not-allowed text-white p-2 rounded-md w-1/3 font-semibold mt-[50px]"
                : "bg-black text-white p-2 rounded-md w-1/3 font-semibold mt-[50px]"
            }
          >
            Sign Up
          </button>
        </div>
        <div className="text-xl font-semibold">OR</div>
        <div className="w-screen flex justify-center">
          <button
            onClick={() => setSignUp(false)}
            className="bg-black text-white p-2 rounded-md w-1/3 font-semibold "
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
