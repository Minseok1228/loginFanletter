import React, { useEffect, useId } from "react";
import Input from "./Input";
import uuid from "react-uuid";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { writeTo } from "../redux/modules/writeToMeat";
import { __getFanLetters, addFanLetter } from "../redux/modules/fanletters";
import { addNickName } from "../redux/modules/nickName";
import { addComment } from "../redux/modules/comment";
import getformattedDate from "../util/date";
import axios from "axios";
const DEFAULT_IMG = "https://t1.daumcdn.net/cfile/tistory/99FD943A5C821D7429";
function Form() {
  const meats = useSelector((state) => {
    return state.MEATS;
  });

  const nickName = useSelector((state) => {
    return state.authSlice.userNickname;
  });

  const comment = useSelector((state) => {
    return state.comment;
  });
  const writeToMeat = useSelector((state) => {
    return state.writeToMeat;
  });

  const fanletters = useSelector((state) => {
    return state.fanletters;
  });
  const userId = useSelector((state) => state.authSlice.userId);
  console.log(userId);

  const dispatch = useDispatch();

  const submitBtnHandler = async (e) => {
    e.preventDefault();

    if (!comment) {
      return alert("150자 내의 내용을 입력해 주세요.");
    }
    const newFanLetter = {
      id: uuid(),
      writeto: writeToMeat,
      nickName,
      comment,
      avatar: DEFAULT_IMG,
      userId: userId,
      createdAt: Date.now(),
    };
    await axios.post(
      `${process.env.REACT_APP_SEVER_URL}/fanLetters`,
      newFanLetter
    );
    await dispatch(__getFanLetters());

    console.log(newFanLetter);
    // dispatch(addFanLetter([...fanletters, newFanLetter]));
    dispatch(addComment(""));
  };
  const selectMeat = (e) => {
    dispatch(writeTo(e.target.value));
  };

  const addCommentFunc = (e) => {
    dispatch(addComment(e.target.value));
  };
  return (
    <StForm>
      <StFormSection>
        <StFormP>닉네임 : </StFormP>
        <StFormP>{nickName}</StFormP>
      </StFormSection>
      <StFormSection>
        <StFormP>내용 : </StFormP>

        <Input
          state={comment}
          dispatch={addCommentFunc}
          length={150}
          msg={"150자 내로 입력해 주세요."}
        />
      </StFormSection>
      <StFormSection>
        <StLabel>최애의 부위를 선택해 주세요</StLabel>
        <StSelect onChange={selectMeat}>
          {meats.map((meat) => {
            return <option key={meat}>{meat}</option>;
          })}
        </StSelect>
      </StFormSection>
      <StSubmitBtn type="button" onClick={submitBtnHandler}>
        팬레터 등록
      </StSubmitBtn>
    </StForm>
  );
}

export default Form;

const StForm = styled.form`
  border: 5px double black;
  width: 650px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
const StFormSection = styled.section`
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;
const StSelect = styled.select`
  height: 2rem;
  cursor: pointer;
`;
const StSubmitBtn = styled.button`
  font-size: 1.8rem;
  background-color: inherit;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;
const StFormP = styled.p`
  margin: 10px;
`;
const StLabel = styled.label`
  margin: 10px;
`;
