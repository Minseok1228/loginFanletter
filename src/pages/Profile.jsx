import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

function Profile() {
  const { userAvatar, userNickname, userId } = useSelector(
    (state) => state.authSlice
  );
  const [cahageUserAvart, setCahageUserAvart] = useState(userAvatar);
  const [edit, setEdit] = useState(false);
  const [changeUserNickname, setChangeUserNickname] = useState(userNickname);
  const onEditHandler = () => {
    setEdit(!edit);
  };
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  const formData = new FormData();
  formData.append("avatar", cahageUserAvart);
  formData.append("nickname", changeUserNickname);
  const onHandleProfileChange = async () => {
    try {
      const res = await axios.patch(
        "https://moneyfulpublicpolicy.co.kr/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Wrap>
          <Title>프로필 관리</Title>
          <ImageBox>
            <figure>
              {edit ? (
                <ImageInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    console.log("인푻이미지", e.target.files[0]);
                  }}
                />
              ) : (
                <ProfileImage src={userAvatar} />
              )}
            </figure>
          </ImageBox>
          {edit ? (
            <Input
              value={changeUserNickname}
              onChange={(e) => setChangeUserNickname(e.target.value)}
            />
          ) : (
            <P>{userNickname}</P>
          )}
          <P>{userId}</P>
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
