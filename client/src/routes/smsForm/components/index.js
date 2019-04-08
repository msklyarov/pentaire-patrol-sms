import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

class SmsFormComponent extends React.Component {
  state = {
    smsFrom: '',
    smsTo: '',
    texts: ''
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  sendSms = event  => {
    event.preventDefault();
    const data = {
      ...this.state,
      smsFrom: this.state.smsFrom.split('\n'),
      smsTo: this.state.smsTo.split('\n'),
      texts: this.state.texts.split('\n'),
    };
    this.props.sendSms(data);
    this.props.onStart();
  };

  render() {
    return (
      <React.Fragment>
        <FormRow>
          <TextField
            error
            id="proxy"
            label="Proxy"
            onChange={this.handleChange('proxy')}
            placeholder="PROXY:PORT"
            margin="normal"
          />
          <TextField
            error
            id="auth"
            label="Auth"
            onChange={this.handleChange('auth')}
            placeholder="AUTH:PASSWORD"
            margin="normal"
          />
        </FormRow>
        <FormRow>
          <TextField
            error
            id="rcClientId"
            label="Client Id"
            onChange={this.handleChange('rcClientId')}
            margin="normal"
          />
          <TextField
            error
            id="rcClientSecret"
            label="Client Secret"
            onChange={this.handleChange('rcClientSecret')}
            margin="normal"
          />
        </FormRow>
        <FormRow>
          <TextField
            error
            id="rcUsername"
            label="Username"
            onChange={this.handleChange('rcUsername')}
            margin="normal"
          />
          <TextField
            error
            id="rcPassword"
            label="Password"
            onChange={this.handleChange('rcPassword')}
            margin="normal"
          />
        </FormRow>
        <TextField
          error
          id="rcServerUrl"
          label="Server Url"
          onChange={this.handleChange('rcServerUrl')}
          margin="normal"
        />
        <TextField
          error
          id="smsFrom"
          label="SMS From"
          onChange={this.handleChange('smsFrom')}
          multiline
          rowsMax="4"
          margin="normal"
        />
        <TextField
          error
          id="smsTo"
          label="SMS To"
          onChange={this.handleChange('smsTo')}
          multiline
          rowsMax="4"
          margin="normal"
        />
        <TextField
          error
          id="texts"
          label="Texts"
          onChange={this.handleChange('texts')}
          multiline
          rowsMax="4"
          margin="normal"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={this.sendSms}
        >
          Start
        </Button>
      </React.Fragment>
    )
  }
}

export default SmsFormComponent;