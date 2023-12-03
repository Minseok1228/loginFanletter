import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import authInstance from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/modules/authSlice";

function Profile() {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const userData = await authInstance.get("/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(userData.data);
      setUserData(userData.data);
      setChangeUserAvarta(userData.data.avatar);
      setPreview(userData.data.avatar);
      setChangeUserNickname(userData.data.nickname);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  const [userData, setUserData] = useState({});
  console.log(userData);

  const [edit, setEdit] = useState(false);
  const [changeUserAvarta, setChangeUserAvarta] = useState("");
  const [changeUserNickname, setChangeUserNickname] = useState(
    userData.nickname
  );
  const onEditHandler = () => {
    setEdit(!edit);
  };
  const formData = new FormData();
  formData.append("avatar", changeUserAvarta);
  formData.append("nickname", changeUserNickname);
  const onHandleProfileChange = async () => {
    try {
      await authInstance.patch("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
    getUserData();
    setEdit(false);
    dispatch(signIn({ ...userData, userId: userData.id }));
  };

  const fileInput = useRef(null);
  const [preview, setPreview] = useState();

  const onChange = (e) => {
    if (changeUserAvarta) {
      setChangeUserAvarta(e.target.files[0]);
    }
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <Container>
        <Wrap>
          <Title>프로필 관리</Title>
          <ImageBox>
            <figure>
              {edit ? (
                <>
                  <ProfileImage
                    src={preview} //url이들어가고
                    onClick={() => {
                      fileInput.current.click();
                    }}
                  />
                  <ImageInput
                    type="file"
                    accept="image/*"
                    ref={fileInput}
                    onChange={onChange}
                    // onChange={(e) => {
                    //   setChangeUserAvarta(e.target.files[0]);
                    // }}
                  />
                </>
              ) : (
                <ProfileImage src={userData.avatar} />
              )}
            </figure>
          </ImageBox>
          {edit ? (
            <Input
              value={changeUserNickname}
              onChange={(e) => setChangeUserNickname(e.target.value)}
            />
          ) : (
            <P>{userData.nickname}</P>
          )}
          <P>{userData.id}</P>
          <BtnBox>
            {edit ? (
              <>
                <Btn onClick={onEditHandler}>취소</Btn>
                <Btn onClick={onHandleProfileChange}>수정완료</Btn>
              </>
            ) : (
              <Btn onClick={onEditHandler}>수정하기</Btn>
            )}
          </BtnBox>
        </Wrap>
      </Container>
    </>
  );
}

export default Profile;
const ImageInput = styled.input`
  display: none;
  width: 180px;
  height: 180px;
`;
const Btn = styled.button`
  cursor: pointer;
  font-size: 20px;
  width: 100px;
  height: 40px;
`;
const P = styled.p`
  text-align: center;
  width: 200px;
  height: 30px;
`;
const BtnBox = styled.div`
  display: flex;
  gap: 10px;
`;
const ProfileImage = styled.img`
  width: 180px;
  height: 180px;
`;
const ImageBox = styled.div``;

const Title = styled.p`
  font-size: 50px;
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
  height: 470px;
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
  text-align: center;

  width: 200px;
  height: 30px;
`;
