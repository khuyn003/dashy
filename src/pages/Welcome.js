import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import useStateWithLocalStorage from 'helpers/localStorage';
import {
  LOCAL_STORAGE_USERNAME,
  ROUTE_HELLO
} from 'app-constants';

const Prompt = styled.label`
  color: #fff;
  font-size: 55px;
  font-weight: 500;
  text-align: center;
  margin: 0;
  text-shadow: 0 1px 5px rgba(0, 0, 0, .3);
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
  border-bottom: 3px solid ${props => props.isError ? props.theme.colors.error : '#fff'};
  font-size: 55px;
  color: #fff;
  text-align: center;
  box-shadow: 0 1px 0 rgba(0, 0, 0, .3);
  text-shadow: 0 1px 5px rgba(0, 0, 0, .3);
`;

const Hello = () => {
  const [username, setusername] = useState('');
  const [usernameLocalStorage, setusernameLocalStorage] = useStateWithLocalStorage(LOCAL_STORAGE_USERNAME);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    if (!username) {
      setIsError(true);
    }

    e.preventDefault();

    setusernameLocalStorage(username);
  }

  const handleChange = (e) => {
    if (!e.target.value) {
      setIsError(true);
    }

    setIsError(false);
    setusername(e.target.value);
  }

  return (
    usernameLocalStorage
      ? <Redirect to={ROUTE_HELLO} />
      : (
        <Form onSubmit={handleSubmit}>
          <Prompt for="dashy-first-name">What's your first name?</Prompt>
          <Input
            id="dashy-first-name"
            type="text"
            isError={isError}
            onChange={handleChange}
            autofocus="autofocus"
          />
        </Form>
      )
  );
}

export default Hello;
