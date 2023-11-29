import React from "react";
import styled from "styled-components";

function Input({ title, state, dispatch, length, msg }) {
  return (
    <>
      <p>{title}</p>
      <StInpute
        maxLength={length}
        value={state}
        placeholder={msg}
        onChange={dispatch}
      />
    </>
  );
}

export default Input;

const StInpute = styled.input`
  height: 1.8rem;
`;
