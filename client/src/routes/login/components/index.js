import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
      <React.Fragment>
        <TextField
          error
          label="Username"
          onChange={this.handleChange('username')}
          margin="normal"
        />
        <TextField
          error
          label="Password"
          type="password"
          onChange={this.handleChange('password')}
          margin="normal"
        />
        <Button
          style={{ marginTop: '2em' }}
          variant="contained"
          color="secondary"
          onClick={this.onLogon}
        >
          Submit
        </Button>
      </React.Fragment>
    );
  }
}

export default LoginComponent;
