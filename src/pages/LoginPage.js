import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userState } from "../store/userSlice";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import ProfilePage from "./ProfilePage";
import SignUpPage from "./SignUpPage";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const user = useSelector(userState);
  const dispatch = useDispatch();
  const [signUp, setSignUp] = useState(false);

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {signUp ? (
        <SignUpPage setSignUp={setSignUp} />
      ) : (
        <div className="h-screen flex  w-screen justify-center items-center">
          <div className="space-y-4 flex flex-col w-screen jutsify-center items-center ">
            <h1 className="text-4xl font-extrabold text-blue-600 justify-center ">
              Login
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

              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Enter password"
                className="outline-none border-black border-b-2 p-4 text-xl "
              />
            </div>
            <div className="w-screen flex justify-center">
              <Link
                to="/"
                onClick={login}
                className="bg-black flex justify-center text-white p-2 rounded-md w-1/3 font-semibold mt-[50px]"
              >
                Login
              </Link>
            </div>

            <div>
              <span>Don't have an Account? </span>

              <span
                onClick={() => setSignUp(true)}
                className="text-blue-700 cursor-pointer"
              >
                Sign up here
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginPage;
