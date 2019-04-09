import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default ({ status, stopSms }) => (
  <React.Fragment>
    <TextField
      error
      label="Status"
      multiline
      rowsMax="4"
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
      onClick={stopSms}
    >
      Stop
    </Button>
  </React.Fragment>
);
