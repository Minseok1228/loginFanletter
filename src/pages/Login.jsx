import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { signIn, signUp } from "../redux/modules/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [data, setData] = useState();
  const fetchTodos = async () => {
    const data = await axios.get("https://moneyfulpublicpolicy.co.kr");
    // const { data } = await axios.get(`${process.env.REACT_APP_SEVER_URL}/todos`)
    console.log("response", data);
    setData(data);
  };
  console.log("data", data);

  useEffect(() => {
    //마운트 됐을떄 =>db 값가져옴

    fetchTodos();
    //return이하 언마운트됐을때
    return;
  }, []);
  // const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
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
      const loginUserData = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        loginUser
      );
      console.log("로그인유저", loginUserData);
      localStorage.setItem("accessToken", loginUserData.data.accessToken);
      dispatch(signIn(loginUserData.data));

      navigate("/");
    } catch (error) {
      console.log("로그인 에러", error);
    }
  };

  const onHandleSignUP = async () => {
    const newUser = {
      id: userId,
      password: userPassword,
      nickname: userNickname,
    };
    try {
      await axios.post("https://moneyfulpublicpolicy.co.kr/register", newUser);
    } catch (error) {
      console.log("회원가입 에러", error);
    }
    // dispatch(signUp({ userId, userPassword, userNickname }));
    setToggleBtn(true);
  };
  return (
    <>
      <Container>
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
