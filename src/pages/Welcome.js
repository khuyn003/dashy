import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import useStateWithLocalStorage from 'helpers/localStorage';
import {
  LOCAL_STORAGE_USERNAME,
  ROUTE_HELLO
} from 'app-constants';

const Form = styled.form`
  padding: 0 25px;
`;

const Label = styled.label`
  display: block;
  width: 100%;
  font: 500 36px/1.2 ${props => props.theme.fonts.primary};
  text-align: center;
  color: #fff;
  text-shadow: 0 1px 5px rgba(0, 0, 0, .3);

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    font-size: 55px;
  }
`

const Input = styled.input`
  display: block;
  width: 100%;
  margin-top: 10px;
  outline: none;
  background: none;
  border: 0;
  border-bottom: 3px solid ${props => props.isError ? props.theme.colors.error : '#fff'};
  font-size: 36px;
  color: #fff;
  text-align: center;
  box-shadow: 0 1px 0 rgba(0, 0, 0, .3);
  text-shadow: 0 1px 5px rgba(0, 0, 0, .3);

  @media (min-width: ${props => props.theme.breakpoints.small}) {
    font-size: 55px;
  }
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
          <Label>What's your first name?</Label>
          <Input
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
