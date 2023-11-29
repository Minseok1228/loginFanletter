import React from "react";
import Form from "../components/Form";
import styled from "styled-components";
import Filter from "../components/Filter";

function Main() {
  return (
    <StMain>
      <Form />
      <StUl>
        <Filter />
      </StUl>
    </StMain>
  );
}

export default Main;

const StUl = styled.ul`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-top: 10px;
`;
const StMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;
