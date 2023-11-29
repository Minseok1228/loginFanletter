import React from "react";
import styled, { css } from "styled-components";

function DetailBtn({ detailBtnFunc, id, children, btnCss }) {
  return (
    <StDetailBtn $btncss={btnCss} onClick={() => detailBtnFunc(id)}>
      {children}
    </StDetailBtn>
  );
}

export default DetailBtn;

const StDetailBtn = styled.button`
  width: 100px;
  height: 50px;
  border: 3px solid black;
  font-size: 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  ${({ $btncss }) => {
    if ($btncss === "toHome") {
      return css`
        margin: 10px;
      `;
    }
  }}
`;
