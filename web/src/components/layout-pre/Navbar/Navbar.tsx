import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import bunkrLogo from '../../../assets/img/bunkrLogo.png';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 20px 0px 12px 127.2px;
  height: 90px;
  border-bottom: 1px solid #8444f9;
  /* border-bottom: 1px solid linear-gradient(right, #8444f9, #eb77c7); */

  @media (max-width: 1366px) {
    padding: 20px 0px 12px 15px;
  }
`;

const Img = styled.img`
  width: 160.84px;
  height: 58px;
`;

const Navbar = () => {
  return (
    <Nav data-test="navbar">
      <Link to="/">
        <Img src={bunkrLogo} alt="" />
      </Link>
    </Nav>
  );
};

export default Navbar;
