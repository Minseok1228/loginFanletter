import React, { useEffect } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const isLogin = useSelector((state) => state.authSlice.isLoggedIn);
  const navigate = useNavigate();

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
