import axios from "axios";
import { useState, useRef, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import App from "../../App";
import "./register.scss";
import { register } from "../../contextApi/authContext/apiCall";
import { AuthContext } from "../../contextApi/authContext/LoginContext";

export default function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {dispatch} = useContext(AuthContext)

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  console.log(username);

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ username , email, password } , dispatch);
  };

  return (
    <div className="register">
      <div className="top">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt=""
        />

        {/* <button className="loginButton" >Sign In</button> */}
      </div>

      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!username ? (
          <div className="input">
            <input type="text" placeholder="username" ref={usernameRef} />
            <button
              className="registerButton"
              onClick={() => {
                setUsername(usernameRef.current.value);
                usernameRef.current.value = null;
              }}
            >
              Get Started
            </button>
          </div>
        ) : !email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button
              className="registerButton"
              onClick={() => setEmail(emailRef.current.value)}
            >
              Get Started
            </button>
          </div>
        ) : (
          <form className="input" onSubmit={handleSubmit}>
            <input type="password" placeholder="password" ref={passwordRef} />
            <button
              className="registerButton"
              onClick={() => setPassword(passwordRef.current.value)}
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
