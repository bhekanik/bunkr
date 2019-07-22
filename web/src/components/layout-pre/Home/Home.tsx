import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import heroImage from '../../../assets/img/heroImage.png';
import meetBunkr from '../../../assets/img/meetBunkr.png';
import sendIcon from '../../../assets/img/sendIcon.png';
import facebook from '../../../assets/img/facebook.png';
import twitter from '../../../assets/img/twitter.png';
import rewards from '../../../assets/img/rewards.png';
import { createInterest } from '../../../store/actions/interestsActions/interestsActions';

const HomeContainer = styled.div`
  flex: 1;
  display: flex;
  padding-bottom: 90px;
`;

interface IContainer {
  padding?: string;
}

const Container = styled.div<IContainer>`
  flex: 1;
  width: 50%;
  padding: ${props => props.padding};
`;

const HomeFooter = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
`;

interface IImg {
  width?: string;
  height?: string;
}

const Img = styled.img<IImg>`
  width: ${props => props.width};
`;

interface IText {
  fontSize?: string;
  width?: string;
  height?: string;
  margin?: string;
}

const Text = styled.p<IText>`
  font-size: ${props => props.fontSize};
  font-family: Google Sans, sans-serif;
  line-height: 1.5;
  color: #1e4563;
  align-items: center;
  margin: ${props => props.margin};
  width: ${props => props.width};
  height: ${props => props.height};
`;

const Form = styled.form`
  width: 467px;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const Input = styled.input`
  border: 0.7px dashed #385f7d;
  border-radius: 5px;
  height: 60px;
  margin: 10px 0;
  padding: 20px;
`;

const Button = styled.div`
  box-shadow: 0px 0px 30px rgba(51, 51, 51, 0.2);
  border-radius: 20px;
  height: 90px;
  background: white;
  display: flex;
  padding: 15px 27.6px;
  margin: 17px 0;
  cursor: pointer;

  button {
    all: unset;
    flex: 1;
    background: linear-gradient(90deg, #8444f9 0%, #eb77c7 100%);
    box-shadow: 0px 0px 30px rgba(51, 51, 51, 0.2);
    border-radius: 10px;
    color: white;
    font-size: 18px;
    font-family: Google Sans, sans-serif;
    text-align: center;
  }
`;

const Home = props => {
  const [interest, setInterest] = useState({
    fullname: '',
    email: ''
  });

  const handleChange = e => {
    setInterest({
      ...interest,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.createInterest(interest);
  };

  return (
    <HomeContainer data-test="home">
      <Container padding="47px 120px">
        <Img width="90%" src={meetBunkr} alt="Intros" />
        <Text fontSize="28px" height="84px">
          Your unified loyalty program.
          <br /> Bringing all your rewards programmes together.
        </Text>
        <Text fontSize="18px" width="451px" height="54px" margin="35px 0 0">
          Connect to Bunkr and unite all your loyalty programs and friends in
          one powerful app.
        </Text>

        <Form onSubmit={handleSubmit}>
          <Input
            required
            name="fullname"
            type="text"
            placeholder="Full Name"
            onChange={handleChange}
          />
          <Input
            required
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
          />
          <Button>
            <button>
              <Img src={sendIcon} /> Notify Me When Ready
            </button>
          </Button>
          <Text fontSize="14px" width="700px">
            Be among the first to try Bunkr! You'll need sign up for Bunkr to
            participate in the BETA.
          </Text>
          <div style={{ margin: '0 auto' }}>
            <a href="https://www.facebook.com/AppBunkr/" target="_blank">
              <img
                style={{ margin: '20px 10px' }}
                src={facebook}
                alt="Facebook"
              />
            </a>
            <a href="#">
              <img
                style={{ margin: '20px 10px' }}
                src={twitter}
                alt="Twitter"
              />
            </a>
          </div>
        </Form>
      </Container>
      <Container>
        <Img
          height="100%"
          src={heroImage}
          alt="Image of phone showing different loyalty programs"
        />
      </Container>
      <HomeFooter>
        <Img src={rewards} alt="Rewards Strip" width="100%" />
      </HomeFooter>
    </HomeContainer>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createInterest: interest => dispatch(createInterest(interest))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Home);
