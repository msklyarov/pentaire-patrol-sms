import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import logonAction from '../../modules/user/actions/logon';
import fetchLoginStatusAction from '../../modules/user/actions/fetchStatus';

import LoginComponent from './components/';

class LoginContainer extends React.Component {
  state = { disableButton: false };

  checkStatus = () => {
    if (this.props.user.skipTimeoutInMs > 0) {
      this.setState({ disableButton: true });
      setTimeout(
        () => this.setState({ disableButton: false }),
        this.props.user.skipTimeoutInMs,
      );
    }
  };

  onLogon = (username, password) => {
    this.props.logon(username, password).then(() => {
      if (this.props.user.loggedIn) {
        this.props.onLogin();
      } else {
        this.checkStatus();
      }
    });
  };

  componentDidMount() {
    this.props.fetchLoginStatus().then(() => this.checkStatus());
  }

  render() {
    return (
      <LoginComponent
        onLogon={this.onLogon}
        disableButton={this.state.disableButton}
      />
    );
  }
}

const select = (state, props) => ({
  user: state.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchLoginStatus: fetchLoginStatusAction,
      logon: logonAction,
    },
    dispatch,
  );

export default connect(
  select,
  mapDispatchToProps,
)(LoginContainer);
