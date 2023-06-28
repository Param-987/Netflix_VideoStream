import { useState, useRef } from "react";
import "./register.scss";
import { useDispatch } from "react-redux";
import { register } from "../../redux/UserRedux/apiCall";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";

export default function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch()
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({email,username,password}))
  };

  return (
    <div className="register">
      <div className="top">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt=""
        />
      </div>

        <Link to={'/login'} style={{textDecoration:"none",color:"inherit"}}>
      <div className="text">
        <ArrowBackIcon/>
        <span>
        Back to Login
        </span>
      </div>
        </Link>

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
