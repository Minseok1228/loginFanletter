import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { signIn, signUp } from "../redux/modules/authSlice";
import { useNavigate } from "react-router-dom";
import authInstance from "../api/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [toggleBtn, setToggleBtn] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onHandleToggle = () => {
    setToggleBtn(!toggleBtn);
  };

  const onHandleSignin = async () => {
    const loginUser = {
      id: userId,
      password: userPassword,
    };
    try {
      const loginUserData = await authInstance.post(
        "/login?expiresIn=10m",
        // "/login?expiresIn=10s",
        loginUser
      );
      localStorage.setItem("accessToken", loginUserData.data.accessToken);
      await dispatch(signIn(loginUserData.data));

      navigate("/");
    } catch (error) {
      toast(error.response.data.message);
    }
  };

  const onHandleSignUP = async () => {
    const newUser = {
      id: userId,
      password: userPassword,
      nickname: userNickname,
    };
    try {
      await authInstance.post("/register", newUser);
      toast("회원가입완료!");
      setToggleBtn(true);
    } catch (error) {
      toast(error.response.data.message);
    }
  };
  return (
    <>
      <Container>
        <ToastContainer />
        <Wrap toggle={toggleBtn}>
          <Title>{toggleBtn ? "로그인" : "회원가입"}</Title>
          <Form>
            <Input
              type="text"
              value={userId}
              minLength={4}
              maxLength={10}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="아이디 (4~10글자)"
            />
            <Input
              type="password"
              value={userPassword}
              minLength={4}
              maxLength={15}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="비밀번호 (4~15글자)"
            />
            {toggleBtn ? (
              ""
            ) : (
              <Input
                type="text"
                value={userNickname}
                minLength={4}
                maxLength={10}
                onChange={(e) => setUserNickname(e.target.value)}
                placeholder="닉네임 (4~10글자)"
              />
            )}
            {toggleBtn ? (
              <Button type="button" onClick={onHandleSignin}>
                {" "}
                로그인{" "}
              </Button>
            ) : (
              <Button type="button" onClick={onHandleSignUP}>
                {" "}
                회원가입
              </Button>
            )}
          </Form>
          <button onClick={onHandleToggle}>
            {toggleBtn ? "회원가입 하러가기" : "로그인 하러가기"}
          </button>
        </Wrap>
      </Container>
    </>
  );
}

export default Login;
const Title = styled.p`
  font-size: 80px;
  font-weight: 800;
  margin: 20px;
`;
const Wrap = styled.div`
  background-color: gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  gap: 10px;
  border-radius: 20px;
  ${({ toggle }) => {
    if (toggle) {
      return css`
        height: 400px;
      `;
    } else {
      return css`
        height: 450px;
      `;
    }
  }}
`;
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Input = styled.input`
  width: 600px;
  height: 50px;
`;
const Button = styled.button`
  width: 600px;
  height: 50px;
`;
