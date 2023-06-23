import "./sidebar.css";
import ReportIcon from '@mui/icons-material/Report';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import TimelineIcon from '@mui/icons-material/Timeline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListIcon from "@mui/icons-material/List";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyleIcon className="sidebarIcon" />
                Home
              </li>
            </Link>
            <li className="sidebarListItem">
              <TimelineIcon className="sidebarIcon" />
              Analytics
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">

            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentityIcon className="sidebarIcon" />
                Users
              </li>
            </Link>

            <Link to="/movies" className="link">
              <li className="sidebarListItem">
                <PlayCircleOutlineIcon className="sidebarIcon" />
                Movies
              </li>
            </Link>

            <Link to="/lists" className="link">
              <li className="sidebarListItem">
                <ListIcon className="sidebarIcon" />
                Lists
              </li>
            </Link>
            <Link to="/weblist" className="link">
              <li className="sidebarListItem">
                <ListIcon className="sidebarIcon" />
                Web Series
              </li>
            </Link>
            <Link to={'/newproduct'} className="link">
            <li className="sidebarListItem">
              <AddCircleOutlineIcon className="sidebarIcon" />
              Add Movie
            </li>
            </Link>
            <Link to={'/newWeb'} className="link">
            <li className="sidebarListItem">
              <AddCircleOutlineIcon className="sidebarIcon" />
              Add Web Series
            </li>
            </Link>
            <Link to={'/newList'} className="link">
            <li className="sidebarListItem">
              <AddCircleOutlineIcon className="sidebarIcon" />
              Add List
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutlineIcon className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeedIcon className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutlineIcon className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutlineIcon className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <TimelineIcon className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <ReportIcon className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
