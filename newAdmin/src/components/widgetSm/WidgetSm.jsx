import "./widgetSm.css";
import {  useEffect, useState} from "react";
import { Visibility } from "@material-ui/icons";
import axios from 'axios';

// axios.defaults.proxy.host = "http://localhost:8800/api/"

export default function WidgetSm() {
  const [newUsers,setNewUsers] = useState([])

  useEffect(() => {
    const getNewUser = async () =>{
      try {
        const res = await axios.get('user?new=true',{
          headers:{
            token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWU3YzQ5MTg0NDNiMjhiNTc4YWFiZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NDA4ODY3MywiZXhwIjoxNjg0NTIwNjczfQ.vvr8BcX0pbgkljeQx8Z1vjOBfmZrMlmb1rte-j9HPbg"
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
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
          ))} 
      </ul>
    </div>
  );
}
