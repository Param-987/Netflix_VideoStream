import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import { useRef, useState } from 'react'
import ListItem from '../listItem/ListItem'
import './list.scss'

export default function List({list}) {

    const [isMoved,setIsMoved] = useState(false)
    const [slideNumber,setSlideNumber] = useState(0)
    const [clickLimit,setClickLimit] = useState(window.innerWidth/230)
    
    const listRef = useRef()

    const handleClickFunction = (dir) => {
        setIsMoved(true)
        let distance = listRef.current.getBoundingClientRect().x - 50 

        if(dir === 'left' && slideNumber > 0){
            setSlideNumber(slideNumber-1)
            listRef.current.style.transform = `translateX(${230 + distance}px)`
        }
        if(dir === 'right' && slideNumber < 10 - clickLimit){
            setSlideNumber(slideNumber + 1)
            listRef.current.style.transform = `translateX(${-230 + distance}px)`
        }
    }

  return (
    <div className='list'>
        <span className="listTitle">
            {list.title}
        </span>

        <div className="wrapper">
            <ArrowBackIosOutlined className='sliderArrow left' onClick = {() => handleClickFunction("left")}
            style = {{display : !isMoved && "none" }}
            />
            <div className="container" ref = {listRef}>{
                list.content.map((item,idx)=> <ListItem index = {idx} item = {item} key ={idx} />)
            }
            </div>
            <ArrowForwardIosOutlined className='sliderArrow right' onClick = {() => handleClickFunction("right")}/>
        </div>

    </div>
  )
}
 