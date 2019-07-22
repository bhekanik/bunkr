import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from '../SignedInLinks';
import SignedOutLinks from '../SignedOutLinks';
import { connect } from 'react-redux';
import styled from 'styled-components';

import bunkrLogo from '../../../assets/img/bunkrLogo.png';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #aaa;
`;

const Navbar = props => {
  const { auth, profile } = props;
  const links = auth.uid ? (
    <SignedInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
  );
  return (
    <Nav data-test="navbar">
      <div>
        <Link to="/" className="brand-logo">
          <img src={bunkrLogo} alt="" />
        </Link>
        <div className="nav-links">
          {links}
          <ul className="right">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Content</Link>
            </li>
          </ul>
        </div>
      </div>
    </Nav>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Navbar);
