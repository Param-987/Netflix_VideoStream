import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useEffect, useRef, useState } from "react";
import ListItem from "../listItem/ListItem";
import "./list.scss";
import { handleClickFunction } from "../../Functions/Home";

export default function List({ list }) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const listRef = useRef();


  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>

      <div className="wrapper">
        <ArrowBackIosOutlinedIcon
          className="sliderArrow left"
          onClick={() => handleClickFunction("left",setIsMoved,listRef,slideNumber,setSlideNumber)}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>
          {list.content.map((_id, idx) => (
            <ListItem index={idx} _id={_id} key={idx} />
          ))}
        </div>
        <ArrowForwardIosOutlinedIcon
          className="sliderArrow right"
          onClick={() => handleClickFunction("right",setIsMoved,listRef,slideNumber,setSlideNumber)}
        />
      </div>
    </div>
  );
}
