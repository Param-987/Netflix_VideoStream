import React from "react";
import { useState, useEffect } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import Loader from "../loader/Loader";
import "./home.scss";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setlists] = useState([]);
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRandomList = async () => {
      try {
        await axios
          .get(
            `https://netflixbackend-mhrz.onrender.com/api/list${
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
            setlists(res.data);
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getRandomList();
  }, [type, genre]);

  return (
    <>
      {loading ? (
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
