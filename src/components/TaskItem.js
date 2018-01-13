import React, { Component } from 'react';

import EditTask from './EditTask';

class TaskItem extends Component {
  state = {
    edit: false
  }
  hideEditForm = () => {
    this.setState({
      edit: false
    });
  }
  render() {
    const { username, email, text, image_path, status } = this.props.task;
    return (
      <tr>
        <td>{username}</td>
        <td>{email}</td>
        <td>{text}</td>
        <td><img src={image_path} alt='task' /></td>
        <td>{ status ? <i className='fa fa-check-square-o' /> : <i className='fa fa-times' /> }</td>
        {this.props.loggedIn && <td><button className='btn btn-warning' onClick={() => this.setState({ edit: true })}>Edit</button></td>}
        {this.state.edit && <EditTask task={this.props.task} hide={this.hideEditForm} open={this.state.edit} />}
      </tr>
    );
  }
}

export default TaskItem;
