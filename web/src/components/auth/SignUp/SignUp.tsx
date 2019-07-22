import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../../store/actions/authActions/authActions';

type SignUpUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

interface ISignUpProps {
  auth: any;
  authError: string;
  signUp(user: SignUpUser): any;
}

const SignUp = (props: ISignUpProps) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.signUp(user);
  };

  const { auth, authError } = props;
  if (auth.uid) return <Redirect to="/" />;
  return (
    <div className="container" data-test="signup">
      <form onSubmit={handleSubmit} className="white">
        <h5 className="grey-text text-darken-3">Sign Up</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" onChange={handleChange} />
        </div>
        <div className="input-field">
          <button
            className="btn pink lighten-1 z-depth-0"
            data-test="signup-btn">
            Sign Up
          </button>
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
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
