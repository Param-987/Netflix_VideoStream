import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router,Routes,Route, Navigate} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { authContext } from "./context/authContext/AuthContext";
import ListList from "./pages/listList/ListList";
import NewList from "./pages/newList/NewList";
import List from "./pages/list/List";
import Topbar from "./components/topbar/Topbar";
import NewWebSeries from "./pages/newWebSeries/newWebSeries";
import WebList from "./pages/webSeriesList/Weblist";
import EditWebList from "./pages/editWebList/EditWebList";
import AddNewSeason from "./pages/addNewSeason/AddNewSeason";


function App() {

  const {user} = useContext(authContext)

  return (
    <>
    <Router>
        <Topbar />
      <div className="container">
      <Sidebar />
      <Routes>
        <Route path="/login" element = {user ? < Navigate replace to = {'/'}/>:<Login/>} />
        <Route path="/" element={user ? <Home /> : < Navigate replace to = {'/login'}/>}/>
        {user && 
        <>
          <Route path="/users" element={<UserList />}/>
          <Route path="/user/:userId" element={<User />}/>
          <Route path="/newUser" element={<NewUser />}/>
          <Route path="/movies" element={<ProductList />}/>
          <Route path="/product/:productId" element={<Product />}/>
          <Route path="/newproduct" element={<NewProduct />}/>
          <Route path="/newWeb" element={< NewWebSeries/>}/>
          <Route path="/lists" element={<ListList />}/>
          <Route path="/list/:listId" element={<List />}/>
          <Route path="/newlist" element={<NewList/>}/>
          <Route path="/weblist" element={<WebList/>}/>
          <Route path="/weblist/:webId" element={<EditWebList/>}/>
          <Route path="/weblist/:webId/addNewSeason" element={<AddNewSeason/>}/>
        </>
        }
    </Routes>
        </div>
  </Router>
        </>
  )

}

export default App;
