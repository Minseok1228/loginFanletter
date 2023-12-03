import { useLocation, useNavigate, useParams } from "react-router-dom";
import PrintLetter from "../components/PrintLetter";
import DetailBtn from "../components/DetailBtn";
import Modal from "../components/Modal";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { handleEdit } from "../redux/modules/modalOpen";
import { __getFanLetters } from "../redux/modules/fanletters";
import { changeComment } from "../redux/modules/commentChange";
import { useEffect } from "react";
import axios from "axios";

function Detail() {
  const userId = useSelector((state) => state.authSlice.userId);
  const isLogin = useSelector((state) => state.authSlice.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, []);

  const edit = useSelector((state) => {
    return state.modalOpen;
  });
  const dispatch = useDispatch();

  const location = useLocation();
  const letter = location.state;
  const param = useParams();
  const deleteLetterBtn = async (id) => {
    console.log(id);
    if (window.confirm("정말 삭제하시겠습니까")) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_SERVER_URL}/fanLetters/${id}`
        );
        await dispatch(__getFanLetters());
        navigate("/");
      } catch (error) {
        console.log("삭제에러", error);
      }
    }
  };

  const changeCommentBtn = () => {
    dispatch(handleEdit(true));
    dispatch(changeComment(letter.comment));
  };

  console.log("상세레터", letter);

  return (
    <>
      {isLogin ? (
        <>
          <Writeto>{letter.writeto}에게 온 팬레터 입니다.</Writeto>
          <Container>
            {edit ? (
              <Modal letter={letter} />
            ) : (
              <>
                <PrintLetter letter={letter} size={"detail"} />
                {userId === letter.userId ? (
                  <StBtnBox>
                    <DetailBtn detailBtnFunc={deleteLetterBtn} id={param.id}>
                      삭제
                    </DetailBtn>
                    <DetailBtn detailBtnFunc={changeCommentBtn} id={param.id}>
                      수정
                    </DetailBtn>
                  </StBtnBox>
                ) : (
                  ""
                )}
              </>
            )}
          </Container>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Detail;
const Writeto = styled.div`
  display: flex;
  justify-content: center;
  font-size: 3rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StBtnBox = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px;
`;
