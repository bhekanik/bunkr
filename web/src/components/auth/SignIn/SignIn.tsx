import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../../store/actions/authActions/authActions';
import { Redirect } from 'react-router-dom';

type SignInUser = {
  email: string;
  password: string;
};

interface ISignInProps {
  authError: string;
  auth: any;
  signIn(user: SignInUser): any;
}

const SignIn = (props: ISignInProps) => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.signIn(user);
  };

  const { authError, auth } = props;
  if (auth.uid) return <Redirect to="/dashboard" />;
  return (
    <div className="container" data-test="signin">
      <form onSubmit={handleSubmit} className="white">
        <h5 className="grey-text text-darken-3">Sign In</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={handleChange} />
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Login</button>
          <div className="red-text center">
            {authError ? <p>{authError}</p> : null}
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
