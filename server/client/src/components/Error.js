import React from 'react'
import styled from "styled-components";
import ErrorIcon from '@mui/icons-material/Error';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 15px;
  display: flex;
  position: absolute;
  border-radius:4px;
  bottom:20px;
  right:40px;
  gap:10px;
  align-items:center;
`;

const Error = ({ setError }) => {
    return (
        <Container>
            <Wrapper><ErrorIcon />Please sign in to use this feature.</Wrapper>
        </Container>
    )
}

export default Error
