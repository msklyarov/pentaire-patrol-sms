import React from 'react';
import { pick } from 'ramda';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import DataRow from './dataRow';

class UsersComponent extends React.Component {
  onAddUser = event => {
    event.preventDefault();
    this.props.addUser(
      this.name.value,
      this.password.value,
      this.smsLeft.value,
    );
  };

  render() {
    const { users } = this.props;

    return (
      <form onSubmit={this.onAddUser}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>SMS Left</TableCell>
              <TableCell>&nbsp;</TableCell>
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row, i) => (
              <DataRow
                key={i}
                row={row}
                {...pick(['updateUser', 'deleteUser'], this.props)}
              />
            ))}
            <TableRow>
              <TableCell>
                <TextField
                  required
                  defaultValue=""
                  margin="normal"
                  inputRef={input => (this.name = input)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  required
                  defaultValue=""
                  margin="normal"
                  inputRef={input => (this.password = input)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  required
                  defaultValue=""
                  margin="normal"
                  type="number"
                  inputRef={input => (this.smsLeft = input)}
                />
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary" type="submit">
                  Add
                </Button>
              </TableCell>
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>
    );
  }
}

export default UsersComponent;
