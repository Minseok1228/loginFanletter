import React, { useEffect } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getFanLetters } from "../redux/modules/fanletters";

function Home() {
  const fanletters = useSelector((state) => state.fanletters);
  console.log("home", fanletters);

  const isLogin = useSelector((state) => state.authSlice.isLoggedIn);
  console.log(isLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default Home;
