import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

class SmsFormComponent extends React.Component {
  state = {
    smsFrom: '',
    smsTo: '',
    texts: '',
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps.settings });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onSendSms = event => {
    event.preventDefault();
    const data = {
      ...this.state,
      smsFrom: this.state.smsFrom.split('\n'),
      smsTo: this.state.smsTo.split('\n'),
      texts: this.state.texts.split('\n'),
    };
    this.props.onSendSms(data);
    this.props.onStart();
  };

  render() {
    const {
      proxy,
      auth,
      rcClientId,
      rcClientSecret,
      rcUsername,
      rcPassword,
      rcServerUrl,
    } = this.state;

    return (
      <Form onSubmit={this.onSendSms}>
        <FormRow>
          <TextField
            error
            label="Proxy"
            onChange={this.handleChange('proxy')}
            placeholder="PROXY:PORT"
            value={proxy}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            error
            label="Auth"
            onChange={this.handleChange('auth')}
            placeholder="AUTH:PASSWORD"
            value={auth}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </FormRow>
        <FormRow>
          <TextField
            required
            error
            label="Client Id"
            onChange={this.handleChange('rcClientId')}
            value={rcClientId}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            required
            error
            label="Client Secret"
            onChange={this.handleChange('rcClientSecret')}
            value={rcClientSecret}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </FormRow>
        <FormRow>
          <TextField
            required
            error
            label="Username"
            onChange={this.handleChange('rcUsername')}
            value={rcUsername}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            required
            error
            label="Password"
            onChange={this.handleChange('rcPassword')}
            value={rcPassword}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </FormRow>
        <TextField
          required
          error
          label="Server Url"
          onChange={this.handleChange('rcServerUrl')}
          value={rcServerUrl}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          required
          error
          label="SMS From"
          onChange={this.handleChange('smsFrom')}
          multiline
          rowsMax="4"
          margin="normal"
        />
        <TextField
          required
          error
          label="SMS To"
          onChange={this.handleChange('smsTo')}
          multiline
          rowsMax="4"
          margin="normal"
        />
        <TextField
          required
          error
          label="Texts"
          onChange={this.handleChange('texts')}
          multiline
          rowsMax="4"
          margin="normal"
        />
        <Button
          style={{ marginTop: '2em' }}
          type="submit"
          variant="contained"
          color="secondary"
        >
          Start
        </Button>
      </Form>
    );
  }
}

export default SmsFormComponent;
