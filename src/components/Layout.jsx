import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

function Layout() {
  const navigate = useNavigate();
  const onHandleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <Nav>
        <NavBtn onClick={() => navigate("/")}>홈</NavBtn>
        <Wrap>
          <NavBtn onClick={() => navigate("/profile")}>프로필</NavBtn>
          <NavBtn onClick={onHandleLogOut}>로그아웃</NavBtn>
        </Wrap>
      </Nav>
      <Outlet />
    </>
  );
}

export default Layout;
const Nav = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-evenly;
`;
const NavBtn = styled.button`
  cursor: pointer;

  width: 120px;
  border: 3px solid black;
  font-size: 1.5rem;
  border-radius: 20px;
  font-size: 25px;
`;
const Wrap = styled.div`
  display: flex;
`;
