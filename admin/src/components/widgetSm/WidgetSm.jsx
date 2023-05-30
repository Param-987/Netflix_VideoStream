import "./widgetSm.css";
import {  useEffect, useState} from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

export default function WidgetSm() {
  const [newUsers,setNewUsers] = useState([])

  useEffect(() => {
    const getNewUser = async () =>{
      try {
        const res = await axios.get(process.env.REACT_APP_URL + 'user?new=true',{
          headers:{
            token:"Bearer " + JSON.parse(localStorage.getItem('user')).accessToken
          }
        })

        setNewUsers(res.data)
        
      } catch (error) {
        console.log(error);
      }
    }
    getNewUser();
  }, [])
  

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
          { newUsers.map((user,id)=> (
        <li className="widgetSmListItem" key={id}>
              <img
              src={user.profilePic ||"https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg"}
              alt=""
              className="widgetSmImg"
              />
              <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <VisibilityIcon className="widgetSmIcon" />
            Display
          </button>
        </li>
          ))} 
      </ul>
    </div>
  );
}
