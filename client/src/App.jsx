import "./app.scss"
import Home from './pages/home/Home'
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";

import {
  BrowserRouter as Router,
  Routes,
  Route, 
  Navigate
} from "react-router-dom";
import { useContext} from "react";
import { AuthContext } from "./contextApi/authContext/LoginContext";


const App = () => {
  const {user}  = useContext(AuthContext)
  return (
    <Router>
    <Routes>
      <Route path="/" 
      element = {user ? <Home /> : < Navigate replace to={'/login'} />} 
      />
      <Route path="/register"
       element = {user ? <Navigate replace to={'/'}/> : <Register/>} 
       />
      <Route path="/Login"
       element = {user ? <Navigate replace to={'/'}/> : <Login />} 
       />
       {
        user && (
          <>
          <Route path="/movies" element = {<Home type={"movies"}/>} />
          <Route path="/series" element = {<Home type={"series"}/>} />
          <Route path="/watch" element = {<Watch/>} />
          </>
        )
       }
    </Routes>
    </Router>
  )
};

export default App