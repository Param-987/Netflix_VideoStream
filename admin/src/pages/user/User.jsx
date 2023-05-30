import PublishIcon from '@mui/icons-material/Publish';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import { Link, useLocation, useNavigate } from "react-router-dom";
import "./user.css";
import { useContext, useState } from "react";
import { updateUser } from "../../context/userContext/apiCall";
import { UserContext } from "../../context/userContext/UserContext";

export default function User() {
  const { user } = useLocation().state;
  const [User, setUser] = useState({});

  const {dispatch} = useContext(UserContext)
  const navigate = useNavigate()

  const handleUpdate = (e)=>{
    console.log('clicked')
    e.preventDefault();
    updateUser(user._id,dispatch,User)
    navigate('/users')

  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentityIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroidIcon className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutlineIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearchingIcon className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={`${user.username}`}
                  className="userUpdateInput"
                  name="username"
                  onChange={(e) =>
                    setUser({ ...User, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={`${user.fullname}`}
                  className="userUpdateInput"
                  name="fullname"
                  onChange={(e) =>
                    setUser({ ...User, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={`${user.email}`}
                  className="userUpdateInput"
                  name="email"
                  onChange={(e) =>
                    setUser({ ...User, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>isAdmin</label>
                <input
                  type="text"
                  placeholder={user.isAdmin ? "Yes" : "No"}
                  className="userUpdateInput"
                  name="isAdmin"
                  onChange={(e) =>
                    setUser({ ...User, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="text"
                  placeholder="Password"
                  className="userUpdateInput"
                  name="password"
                  onChange={(e) =>
                    setUser({ ...User, [e.target.name]: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <PublishIcon className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" onClick={handleUpdate}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
