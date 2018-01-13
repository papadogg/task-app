import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Compress from 'compress.js';
import Modal from 'react-modal';
import validator from 'validator';

import * as taskActions from '../actions/tasks';

class NewTask extends Component {
  state = {
    open: false,
    username: '',
    email: '',
    text: '',
    image: '',
    preview: false,
    error: ''
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  submitHandler = (e) => {
    e.preventDefault();
    const { username, email, text, image } = this.state;
    if (!username || !email || !text || !image) {
      this.setState({
        error: 'All fields are required'
      });
      return;
    }
    if (!validator.isEmail(email)) {
      this.setState({
        error: 'Not valid email'
      });
      return;
    }
    this.props.taskActions.createNewTask({
      username,
      email,
      text,
      image
    });
    this.toggleModal();
  }

  fileUploadHandler = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      const fileType = file.type;
      if (!validImageTypes.includes(fileType)) {
        this.setState({
          error: 'Invalid file type',
          image: '',
          imagePreviewUrl: ''
        });
        return;
      }
      const files = [...e.target.files];
      const compress = new Compress();
      compress.compress(files, {
        maxWidth: 320,
        maxHeight: 240
      }).then((data) => {
        const img1 = data[0];
        const base64str = img1.data;
        const imgExt = img1.ext;
        const newFile = Compress.convertBase64ToFile(base64str, imgExt);
        const url = URL.createObjectURL(newFile);
        this.setState({
          image: newFile,
          imagePreviewUrl: url,
          error: ''
        });
      });
      reader.readAsDataURL(file);
    }
  }

  previewHandler = () => {
    const { username, email, text, image } = this.state;
    if (!username || !email || !text || !image) {
      return;
    }
    this.setState({
      preview: !this.state.preview
    });
  }

  toggleModal = () => {
    this.setState({
      open: !this.state.open,
      username: '',
      email: '',
      text: '',
      image: '',
      error: ''
    });
  }

  render() {
    const { username, email, text, preview, imagePreviewUrl, image, error } = this.state;
    return (
      <div>
        <button
          style={{ margin: '20px 0' }}
         className='btn btn-primary'
         onClick={this.toggleModal}
        >
          Create new task
        </button>
        <Modal
          isOpen={this.state.open}
          onRequestClose={this.toggleModal}
          className='newTask'
          overlayClassName='overlay'
          ariaHideApp={false}
          contentLabel='New Task'
        >
        <h3>New Task</h3>
        <form onSubmit={this.submitHandler}>
          <div className='form-group row'>
            <label htmlFor='username' className='col-sm-2 col-form-label'>Username</label>
            <div className='col-sm-10'>
              <input name='username' className='form-control' placeholder='Name' id='username' value={username} onChange={this.changeHandler} />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='email' className='col-sm-2 col-form-label'>Email</label>
            <div className='col-sm-10'>
              <input name='email' className='form-control' placeholder='Email' id='email' value={email} onChange={this.changeHandler} />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='text' className='col-sm-2 col-form-label'>Text</label>
            <div className='col-sm-10'>
            <textarea name='text' className='form-control' placeholder='Text' id='text' value={text} onChange={this.changeHandler} />
            </div>
          </div>
          <div className='col-sm-10 offset-sm-2'>
            <input type='file' name='image' className='custom-file-input' id='validatedCustomFile' accept='image/*' onChange={this.fileUploadHandler} />
            <label className='custom-file-label' htmlFor='validatedCustomFile'>Choose file...</label>
            <div className='invalid-feedback'>Example invalid custom file feedback</div>
          </div>
          <div className='buttonGroup'>
            {error && <p className='error'>{error}</p>}
            <button type='button' disabled={!username || !email || !text || !image} className={preview ? 'btn btn-warning' : 'btn btn-primary'} onClick={this.previewHandler}>{preview ? 'Close preview' : 'Preview'}</button>
            <button type='submit' className='btn btn-success'>Create</button>
            <button type='button' onClick={this.toggleModal} className='btn btn-danger'>Cancel</button>
          </div>
        </form>
        {preview && <div className='preview'>
            <table className='table newTaskTable'>
              <tbody>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Text</th>
                  <th>Image</th>
                </tr>
                <tr>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{text}</td>
                  <td>
                    <img src={imagePreviewUrl} alt='uploaded' />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>}
        </Modal>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);
