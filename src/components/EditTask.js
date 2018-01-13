import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import * as taskActions from '../actions/tasks';

class EditTask extends Component {
  state = {
    text: this.props.task.text,
    status: this.props.task.status !== 0 && true
  }

  changeHandler = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  submitHandler = (e) => {
    e.preventDefault();
    const { text, status } = this.state;
    this.props.taskActions.editTask({
      text,
      status: status === false ? 0 : 10,
      id: this.props.task.id
    });
    this.props.hide();
  }

  render() {
    const { text, status } = this.state;
    return (
      <Modal
         isOpen={this.props.open}
         onRequestClose={this.props.hide}
         className='newTask'
         overlayClassName='overlay'
         ariaHideApp={false}
         contentLabel="Edit Modal"
      >
        <h3>Edit Task</h3>
        <form onSubmit={this.submitHandler}>
          <div className='form-group row'>
            <label htmlFor='text' className='col-sm-2 col-form-label'>Text</label>
            <div className='col-sm-10'>
              <textarea name='text' className='form-control' placeholder='Text goes here' id='text' value={text} onChange={this.changeHandler} />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-2">Status</div>
            <div className="col-sm-10">
              <div className="form-check">
                <input className='form-check-input' type='checkbox' name='status' id='checkbox' checked={status} onChange={this.changeHandler} />
                <label className="form-check-label" htmlFor="checkbox">
                  Done
                </label>
              </div>
            </div>
          </div>
          <button className='btn btn-success' type='submit'>Edit</button>
          <button className='btn btn-danger' type='button' onClick={this.props.hide}>Close</button>
        </form>
      </Modal>
    );
  }
}


const mapStateToProps = state => {
  return {
    tasks: state.tasks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    taskActions: bindActionCreators(taskActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
