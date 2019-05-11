import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import Clock from 'components/Clock';

import useStateWithLocalStorage from 'helpers/localStorage';
import { LOCAL_STORAGE_USERNAME } from 'app-constants';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  height: fit-content;
`;

const Greeting = styled.h1`
  color: #fff;
  flex: 0 0 100%;
  font-size: 55px;
  font-weight: 500;
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 55px;
  color: #fff;
`;

const Input = styled.input`
  display: block;
  margin-top: 10px;
  outline: none;
  background: none;
  border: 0;
  border-bottom: 3px solid ${props => props.isError ? 'red' : '#fff'};
  font-size: 55px;
  color: #fff;
  text-align: center;
  box-shadow: 0 1px 0 rgba(0, 0, 0, .3);
  text-shadow: 0 1px 5px rgba(0, 0, 0, .3);
`;

const Hello = () => {
  const [username, setusername] = useState();
  const [usernameLocalStorage, setusernameLocalStorage] = useStateWithLocalStorage(LOCAL_STORAGE_USERNAME);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    if (!username) {
      setIsError(true);

      e.preventDefault();

      return false;
    }

    setusernameLocalStorage(username);
  }

  const handleChange = (e) => {
    if (!e.target.value) {
      setIsError(true);
    }

    setIsError(false);
    setusername(e.target.value)
  }

  return (
    usernameLocalStorage
      ? <Redirect to="/welcome" />
      : (
        <Wrapper>
          <Greeting>Hello, what's your first name?</Greeting>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              isError={isError}
              onChange={handleChange}
            />
          </Form>
        </Wrapper>
      )
  );
}

export default Hello;
