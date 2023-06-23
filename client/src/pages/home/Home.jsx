import { useState, useEffect } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { useDispatch, useSelector } from "react-redux";
import { getTypeList } from "../../Functions/Home";
import { getAllMovie} from "../../redux/MovieRedux/apicalls";
import { fetchList } from "../../redux/ListRedux/apicalls";

const Home = ({ type }) => {
  const [genre, setGenre] = useState(null);
  const { lists } = useSelector((state) => state.list);
  const dispatch = useDispatch();

  const { MovieById } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(getAllMovie());
    dispatch(fetchList());
  }, [dispatch]);


  return (
    <>
      {Object.keys(MovieById).length >  0 ? (
        <div className="home">
          <Navbar />
          <Featured type={type} setGenre={setGenre} />
          {getTypeList(lists, setGenre, type, genre)
            .sort(() => Math.random() - 0.5)
            .slice(0, 10)
            .map((list, idx) => (
              <List list={list} key={idx} />
            ))}
        </div>
      ) : (
        <Navbar />
      )}
    </>
  );
};

export default Home;
