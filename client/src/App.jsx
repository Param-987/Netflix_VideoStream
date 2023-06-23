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
import { useSelector } from "react-redux";
import { useEffect } from "react";



const App = () => {
  const {user} = useSelector(state=>state.user)
  console.log("user:",user)
  useEffect(()=>localStorage.setItem('user',JSON.stringify(user)))
  return (
    <Router>
    <Routes>
      <Route path="/" 
      element = {user ? <Home type={null}/> : < Navigate replace to={'/login'} />} 
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