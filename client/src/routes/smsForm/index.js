import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pick } from 'ramda';

import sendSmsAction from '../../modules/sms/actions/send';

import SmsFormComponent from './components/';

class SmsFormContainer extends React.Component {
  render() {
    return <SmsFormComponent {...pick(['sendSms', 'onStart'], this.props)} />;
  }
}

const select = (state, props) => ({
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sendSms: sendSmsAction,
    },
    dispatch,
  );

export default connect(
  select,
  mapDispatchToProps,
)(SmsFormContainer);
