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
    if (this.props.sms.taskId) {
      this.props.fetchStatus(this.props.sms.taskId);
    }
    this.setState({
      timerId: setInterval(() => {
        if (this.props.sms.taskId) {
          this.props.fetchStatus(this.props.sms.taskId);
        }
      }, 5000),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId);
    this.props.clearStatus();
  }

  onStopSms = () => this.props.stopSms(this.state.timerId);

  render() {
    return (
      <StatusComponent
        onStopSms={this.onStopSms}
        {...pick(['status', 'onStop'], this.props)}
      />
    );
  }
}

const select = (state, props) => ({
  sms: state.sms,
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
