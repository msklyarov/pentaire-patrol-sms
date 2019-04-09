import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import logonAction from '../../modules/user/actions/logon';

import LoginComponent from './components/';

class LoginContainer extends React.Component {
  onLogon = (username, password) => {
    this.props.logon(username, password).then(() => {
      if (this.props.user.loggedIn) {
        this.props.onLogin();
      }
    });
  };

  render() {
    return <LoginComponent onLogon={this.onLogon} />;
  }
}

const select = (state, props) => ({
  user: state.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logon: logonAction,
    },
    dispatch,
  );

export default connect(
  select,
  mapDispatchToProps,
)(LoginContainer);
