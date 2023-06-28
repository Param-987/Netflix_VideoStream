import { useEffect, useRef, useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { handleGoogleLogin, login } from "../../redux/UserRedux/apiCall";
import GoogleButton from "react-google-button";

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { isError, isFetching } = useSelector((state) => state.user);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();

  const showError = () => {
    toast.error("You have entered wrong credentials.Try Again", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      theme: "dark",
      newestOnTop: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email,password)
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isError) {
      showError();
      emailRef.current.value = null;
      passwordRef.current.value = null;
    }
  }, [isError]);

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ToastContainer />
          <button
            className="loginButton"
            onClick={handleSubmit}
            disabled={isFetching}
          >
            Sign In
          </button>
          <span>
            New to Netflix?
            <Link to={"/register"}>
              <b>Sign up now.</b>
            </Link>
          </span>
          <span style={{margin:"5px auto" }}>Or</span>
          <div>
            {/* <GoogleButton
              className="googlebtn"
              onClick={() => window.open(`https://netflixbackend-mhrz.onrender.com/auth/google`, "_self")
              // handleGoogleLogin()
              }
            /> */}
          </div>
          {/* <p>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </p> */}
        </form>
      </div>
    </div>
  );
}
