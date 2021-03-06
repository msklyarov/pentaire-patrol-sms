import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default ({ status, onStopSms, onStop }) => {
  const onStopHandler = event => {
    event.preventDefault();
    onStopSms();
    onStop();
  };

  return (
    <React.Fragment>
      <TextField
        error
        label="Status"
        multiline
        rowsMax="8"
        value={status.map((item, i) => `${i + 1}: ${item}`).join('\n')}
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
      <Button
        style={{ marginTop: '2em' }}
        variant="contained"
        color="secondary"
        onClick={onStopHandler}
      >
        Stop
      </Button>
    </React.Fragment>
  );
};
