import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pick } from 'ramda';

import fetchStatusAction from '../../modules/status/actions/fetch';
import clearStatusAction from '../../modules/status/actions/clear';
import stopSmsAction from '../../modules/sms/actions/stop';

import StatusComponent from './components/';

class StatusContainer extends React.Component {
  componentDidMount() {
    this.props.fetchStatus();
    this.setState({
      timerId: setInterval(() => this.props.fetchStatus(), 5000),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId);
    this.props.clearStatus();
  }

  render() {
    return <StatusComponent {...pick(['status', 'stopSms', 'onStop'], this.props)} />;
  }
}

const select = (state, props) => ({
  status: state.status,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchStatus: fetchStatusAction,
      clearStatus: clearStatusAction,
      stopSms: stopSmsAction,
    },
    dispatch,
  );

export default connect(
  select,
  mapDispatchToProps,
)(StatusContainer);
