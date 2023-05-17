import { ArrowBackOutlined } from '@material-ui/icons'
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
            <ArrowBackOutlined/>
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