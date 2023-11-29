import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DetailBtn from "./DetailBtn";
import { useDispatch, useSelector } from "react-redux";
import { handleEdit } from "../redux/modules/modalOpen";
import { changeFanletter } from "../redux/modules/fanletters";
import { changedComment } from "../redux/modules/commentChange";

function Modal({ letter }) {
  const navigate = useNavigate();
  const modalopen = useSelector((state) => {
    return state.modalopen;
  });
  const commentChange = useSelector((state) => {
    return state.commentChange;
  });

  const dispatch = useDispatch();

  const changeCommentBtn = () => {
    if (!commentChange) {
      alert("수정사항을 입력해 주세요");
    } else {
      if (window.confirm("이렇게 수정하시겠습니까")) {
        dispatch(changeFanletter({ letter, comment: commentChange }));
        dispatch(handleEdit(false));
        navigate("/");
      }
    }
  };
  const cancelChange = () => {
    dispatch(handleEdit(false));
  };
  return (
    <>
      <StModal $modalopen={modalopen}>
        <StFigure>
          <StImage src={letter.avatar} alt="프로필" />
        </StFigure>
        <StLetterBox>
          <StNickNameP>{letter.nickName}</StNickNameP>
          <StComment
            maxLength={150}
            value={commentChange}
            onChange={(e) => {
              dispatch(changedComment(e.target.value));
            }}
          />
        </StLetterBox>
      </StModal>
      <StBtnBox>
        <DetailBtn detailBtnFunc={changeCommentBtn}>완료</DetailBtn>
        <DetailBtn detailBtnFunc={cancelChange}>취소</DetailBtn>
      </StBtnBox>
    </>
  );
}
export default Modal;

const StBtnBox = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px;
`;

const StModal = styled.div`
  border: 5px double black;

  width: 900px;
  display: flex;
  flex-direction: row;
  gap: 10xp;
  padding: 15px;
  margin-top: 70px;
  column-gap: 10px;
  height: 300px;
`;
const StFigure = styled.figure`
  width: 200px;
  height: 200px;
  margin: auto 20px auto 20px;
`;

const StLetterBox = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StImage = styled.img`
  width: 100%;
  height: 100%;
`;
const StNickNameP = styled.p`
  margin: 15px;
  width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: 1.7rem;
`;
const StComment = styled.textarea`
  height: 200px;
  width: 600px;
  font-size: 1.1rem;
`;
