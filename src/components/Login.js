import React, { useState } from 'react';
import { AUTH_TOKEN } from '../constants';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const Login = ({ history }) => {
  const [auth, setAuth] = useState({
    login: true,
    email: '',
    password: '',
    name: '',
  });
  
  const _confirm = async (data) => {
    const { token } = auth.login ? data.login : data.signup
    _saveUserData(token);
    history.push('/');
  }
  
  const _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
  console.log(auth);
  
  return (
    <div>
      <h4 className="mv3">{auth.login ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        {!auth.login && (
          <input
            value={auth.name}
            onChange={e => setAuth({ ...auth, name: e.target.value })}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={auth.email}
          onChange={e => setAuth({ ...auth, email: e.target.value })}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={auth.password}
          onChange={e => setAuth({ ...auth, password: e.target.value })}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <Mutation
          mutation={auth.login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ email: auth.email, password: auth.password, name: auth.name }}
          onCompleted={data => _confirm(data)}
        >
          {mutation => (
            <div className='pointer mr2 button' onClick={mutation}>
              {auth.login ? 'login' : 'create account'}
            </div>
          )}
        </Mutation>
        <div
          className="pointer button"
          onClick={() => setAuth({ auth: { login: !auth.login } })}
        >
          {auth.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </div>
      </div>
    </div>
  );
}

export default Login;