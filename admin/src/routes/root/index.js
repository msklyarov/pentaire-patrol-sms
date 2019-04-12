import React from 'react';
import styled from 'styled-components';

// import LoginContainer from '../login/';
import UsersContainer from '../users/';
// import StatusContainer from '../status/';
// import { screenType } from '../../utils/constants';

const RootContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
`;

class RootComponent extends React.Component {
  // state = { screen: screenType.login };
  //
  // handleScreenChange = screenType => {
  //   this.setState({
  //     screen: screenType,
  //   });
  // };

  render() {
    // const Page = () => {
    //   switch (this.state.screen) {
    //     case screenType.login:
    //       return (
    //         <LoginContainer
    //           onLogin={() => this.handleScreenChange(screenType.smsForm)}
    //         />
    //       );
    //
    //     case screenType.smsForm:
    //       return (
    //         <SmsFormContainer
    //           onStart={() => this.handleScreenChange(screenType.status)}
    //         />
    //       );
    //
    //     case screenType.status:
    //       return (
    //         <StatusContainer
    //           onStop={() => this.handleScreenChange(screenType.login)}
    //         />
    //       );
    //
    //     default:
    //       return null;
    //   }
    // };

    return (
      <RootContainer>
        <UsersContainer />
        {/*<Page />*/}
      </RootContainer>
    );
  }
}

export default RootComponent;
