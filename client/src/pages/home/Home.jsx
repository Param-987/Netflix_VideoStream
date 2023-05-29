import React from "react";
import { useState, useEffect } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import Loader from "../loader/Loader";
import "./home.scss";
import axios from "axios";
import {
  fetchListStart,
  fetchListSuccess,
  fetchListFailure,
} from "../../redux/ListRedux/ListAction";
import { useDispatch, useSelector } from "react-redux";

const Home = ({ type }) => {
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const { lists } = useSelector((state) => state.list);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchList = () => {
      return async (dispatch) => {
        try {
          dispatch(fetchListStart());
          await axios
            .get(
              `http://18.204.215.48:5000/api/list${
                type ? "?type=" + type : ""
              }${genre ? "&genre=" + genre : ""}`,
              {
                headers: {
                  token:
                    "Bearer " +
                    JSON.parse(localStorage.getItem("user")).accessToken,
                },
              }
            )
            .then((res) => {
              dispatch(fetchListSuccess(res.data));
              setLoading(false);
            });
        } catch (error) {
          dispatch(fetchListFailure());
        }
      };
    };
    dispatch(fetchList());
  }, [type, genre, dispatch]);

  return (
    <>
      {loading  ? (
        <Loader />
      ) : (
        <div className="home">
          <Navbar />
          <Featured type={type} setGenre={setGenre} />
          {lists.map((list, idx) => (
            <List list={list} key={idx} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
