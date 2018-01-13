import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UltimatePagination from 'react-ultimate-pagination-bootstrap-4';
import * as taskActions from '../actions/tasks';

import TaskItem from './TaskItem';

class TaskList extends Component {
  componentDidMount() {
    this.props.taskActions.fetchTasks();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.tasks.page !== nextProps.tasks.page ||
      this.props.tasks.sortField !== nextProps.tasks.sortField ||
      this.props.tasks.direction !== nextProps.tasks.direction) {
          this.props.taskActions.fetchTasks();
      }
  }
  sortBy = (sortField, direction) => {
    this.props.taskActions.sortBy(sortField, direction);
  }
  changePage = (page) => {
    this.props.taskActions.setPage(page);
  }
  render() {
    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>
                username <span className='sortGroup'>
                           <i className="fa fa-caret-up" onClick={() => this.sortBy('username', 'desc')} />
                           <i className="fa fa-caret-down" onClick={() => this.sortBy('username', 'asc')} />
                         </span>
              </th>
              <th>
                email <span className='sortGroup'>
                        <i className="fa fa-caret-up" onClick={() => this.sortBy('email', 'desc')} />
                        <i className="fa fa-caret-down" onClick={() => this.sortBy('email', 'asc')} />
                      </span>
              </th>
              <th>text</th>
              <th>image</th>
              <th>
                status <span className='sortGroup'>
                         <i className="fa fa-caret-up" onClick={() => this.sortBy('status', 'desc')} />
                         <i className="fa fa-caret-down" onClick={() => this.sortBy('status', 'asc')} />
                       </span>
              </th>
              {this.props.loggedIn && <th />}
            </tr>
          </thead>
          <tbody>
            { this.props.tasks.taskList.map(task => <TaskItem key={task.id} task={task} loggedIn={this.props.loggedIn} />)}
          </tbody>
        </table>
        <UltimatePagination
          currentPage={this.props.tasks.page}
          totalPages={this.props.tasks.totalPages}
          onChange={this.changePage}
        />
        {this.props.tasks.loading && <div className='loaderOverlay'><div className='loader' /></div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    loggedIn: state.auth.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    taskActions: bindActionCreators(taskActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
