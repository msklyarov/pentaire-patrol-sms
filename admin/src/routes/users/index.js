import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pick } from 'ramda';

import fetchUsersAction from '../../modules/users/actions/fetch';
import clearUsersAction from '../../modules/users/actions/clear';
import addUserAction from '../../modules/users/actions/add';
import updateUserAction from '../../modules/users/actions/update';
import deleteUserAction from '../../modules/users/actions/delete';

import UsersComponent from './components/';

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  componentWillUnmount() {
    this.props.clearUsers();
  }

  render() {
    return (
      <UsersComponent
        {...pick(['users', 'addUser', 'updateUser', 'deleteUser'], this.props)}
      />
    );
  }
}

const select = (state, props) => ({
  users: state.users,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUsers: fetchUsersAction,
      clearUsers: clearUsersAction,
      addUser: addUserAction,
      deleteUser: deleteUserAction,
      updateUser: updateUserAction,
    },
    dispatch,
  );

export default connect(
  select,
  mapDispatchToProps,
)(UsersContainer);
