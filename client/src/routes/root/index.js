import React from 'react';
import styled from 'styled-components';

import logo from '../../images/logo.png';

import LoginContainer from '../login/';
import SmsFormContainer from '../smsForm/';
import StatusContainer from '../status/';
import { screenType } from '../../utils/constants';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LogoImg = styled.img`
  margin: auto;
`;

class RootComponent extends React.Component {
  state = { screen: screenType.login };

  handleScreenChange = screenType => {
    this.setState({
      screen: screenType,
    });
  };

  render() {
    const Page = () => {
      switch (this.state.screen) {
        case screenType.login:
          return (
            <LoginContainer
              onLogin={() => this.handleScreenChange(screenType.smsForm)}
            />
          );

        case screenType.smsForm:
          return (
            <SmsFormContainer
              onStart={() => this.handleScreenChange(screenType.status)}
            />
          );

        case screenType.status:
          return (
            <StatusContainer
              onStart={() => this.handleScreenChange(screenType.login)}
            />
          );

        default:
          return null;
      }
    };

    return (
      <RootContainer>
        <LogoImg src={logo} width={184} alt="Logo" />
        <Page />
      </RootContainer>
    );
  }
}

export default RootComponent;
