import {ArrowDropDown, Notifications, Search } from '@material-ui/icons'
import { Link } from "react-router-dom";

import React, { useContext } from 'react'
import { useState } from 'react'
import './navbar.scss'
import { AuthContext } from '../../contextApi/authContext/LoginContext';
import { logout } from '../../contextApi/authContext/apiCall';

const Navbar = () => {
    
    const [isScrolled, setIsScrolled] = useState(false);

    const {dispatch} = useContext(AuthContext)

    
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };
  return (
    <div className={isScrolled ? 'navbar scrolled'  :'navbar' } >
        <div className="container">
            <div className="left">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
            <Link to={'/'} className="link"><span>Homepage</span></Link>
            <Link to={'/series'} className="link"><span>Series</span></Link>
            <Link to={'/movies'} className="link"><span>Movies</span></Link>
            <span>New and Popular</span>
            <span>My List</span>
            </div>
            <div className="right">
                <Search className='icons'/>
                <span>KID</span>
                <Notifications className='icons'/>
                <img src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
                <div className="profile">

                <ArrowDropDown className='icons'/>

                <div className="options">
                    <span>Settings</span>
                    <Link to = {'/'} className="link" onClick={()=>logout(dispatch)}>
                    <span>LogOut</span>
                    </Link>
                </div>

                </div>

            </div>
        </div>
        
        </div>
  )
}

export default Navbar