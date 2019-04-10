import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

class LoginComponent extends React.Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onLogon = event => {
    event.preventDefault();
    this.props.onLogon(this.state.username, this.state.password);
  };

  render() {
    return (
      <Form onSubmit={this.onLogon}>
        <TextField
          required
          error
          label="Username"
          onChange={this.handleChange('username')}
          margin="normal"
        />
        <TextField
          required
          error
          label="Password"
          type="password"
          onChange={this.handleChange('password')}
          margin="normal"
        />
        <Button
          disabled={this.props.disableButton}
          style={{ marginTop: '2em' }}
          type="submit"
          variant="contained"
          color="secondary"
        >
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginComponent;
