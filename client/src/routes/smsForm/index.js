import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pick } from 'ramda';

import fetchSettingsAction from '../../modules/settings/actions/fetch';
import clearSettingsAction from '../../modules/settings/actions/clear';

import sendSmsAction from '../../modules/sms/actions/send';

import SmsFormComponent from './components/';

class SmsFormContainer extends React.Component {
  componentDidMount() {
    this.props.fetchSettings(this.props.user.username);
  }

  componentWillUnmount() {
    this.props.clearSettings();
  }

  onSendSms = data => this.props.sendSms(this.props.user.username, data);

  render() {
    return (
      <SmsFormComponent
        onSendSms={this.onSendSms}
        {...pick(['settings', 'onStart'], this.props)}
      />
    );
  }
}

const select = (state, props) => ({
  user: state.user,
  settings: state.settings,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSettings: fetchSettingsAction,
      clearSettings: clearSettingsAction,
      sendSms: sendSmsAction,
    },
    dispatch,
  );

export default connect(
  select,
  mapDispatchToProps,
)(SmsFormContainer);
