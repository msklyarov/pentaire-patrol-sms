import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class DataRow extends React.Component {
  state = { editMode: false, file: null };

  toggleState = () => this.setState({ editMode: !this.state.editMode });

  onUpdateUser = event => {
    event.preventDefault();
    this.props.updateUser(
      this.props.row.id,
      this.name.value,
      this.password.value,
      this.smsLeft.value,
    );
    this.setState({ editMode: false });
  };

  onDeleteUser = event => {
    event.preventDefault();
    this.props.deleteUser(this.props.row.id);
  };

  render() {
    const { row } = this.props;
    const { editMode } = this.state;

    return (
      <TableRow>
        <TableCell>
          {!editMode ? (
            row.name
          ) : (
            <TextField
              required
              defaultValue={row.name}
              margin="normal"
              inputRef={input => (this.name = input)}
            />
          )}
        </TableCell>
        <TableCell>
          {!editMode ? (
            row.password
          ) : (
            <TextField
              required
              defaultValue={row.password}
              margin="normal"
              inputRef={input => (this.password = input)}
            />
          )}
        </TableCell>
        <TableCell>
          {!editMode ? (
            row.smsLeft
          ) : (
            <TextField
              required
              defaultValue={row.smsLeft}
              margin="normal"
              type="number"
              inputRef={input => (this.smsLeft = input)}
            />
          )}
        </TableCell>
        <TableCell>
          {!editMode ? (
            <Button
              variant="contained"
              color="primary"
              onClick={this.toggleState}
            >
              Edit
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={this.toggleState}
            >
              Cancel
            </Button>
          )}
        </TableCell>
        <TableCell>
          {!editMode ? (
            <Button
              variant="contained"
              color="primary"
              onClick={this.onDeleteUser}
            >
              Delete
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={this.onUpdateUser}
            >
              Save
            </Button>
          )}
        </TableCell>
      </TableRow>
    );
  }
}

export default DataRow;
