import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import logonAction from '../../modules/admin/actions/logon';
import fetchLoginStatusAction from '../../modules/admin/actions/fetchStatus';

import LoginComponent from './components/';

class LoginContainer extends React.Component {
  state = { disableButton: false };

  checkStatus = () => {
    if (this.props.admin.skipTimeoutInMs > 0) {
      this.setState({ disableButton: true });
      setTimeout(
        () => this.setState({ disableButton: false }),
        this.props.admin.skipTimeoutInMs,
      );
    }
  };

  onLogon = (username, password) => {
    this.props.logon(username, password).then(() => {
      if (this.props.admin.loggedIn) {
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
  admin: state.admin,
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
