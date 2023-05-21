import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Link, useLocation } from 'react-router-dom'
import './watch.scss'

const Watch = (props) => {
  const location = useLocation()
  console.log(location)
  const { movie } = location.state

  return (
    <div className='watch'>
      <Link to={'/'}>
        <div className="back">
            <ArrowBackOutlinedIcon/>
            Home
        </div>
      </Link>

        <video className='video' 
        autoPlay
        progress = "true"
        controls 
        src={movie.video} />

    </div>
  )
}

export default Watch