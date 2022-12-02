import * as Redux from 'redux';
import React from 'react';
import './Task.css'
const { Component } = React;

const todoTasks = (taskState = [], taskAction) => {
  switch (taskAction.type) {
    case 'TASK_ADD':
      return [
        ...taskState,
        todoTask(undefined, taskAction)
      ];
    case 'TASK_COMPLETE':
      return taskState.map(theTask =>
        todoTask(theTask, taskAction)
      );
    case 'TASK_DELETE':
    let newTaskState = [];
      taskState.map(theTask => {
        if(theTask.todoText !==taskAction.todoText)
        {
          newTaskState.push(theTask);
        }
      });
      return newTaskState;
    default:
      return taskState;
  }
};

const todoTask = (taskState, taskAction) => {
  switch (taskAction.type) {
    case 'TASK_ADD':
      return {
        todoTaskId: taskAction.todoTaskId,
        todoText: taskAction.todoText,
        todoTaskStatus: false
      };
    case 'TASK_COMPLETE':
      if (taskState.todoTaskId !== taskAction.todoTaskId) {
        return taskState;
      }
      return {
        ...taskState,
        todoTaskStatus: !taskState.todoTaskStatus
      };
    case 'TASK_DELETE':
      return taskState;
    default:
      return taskState;
  }
};

const taskFilter = (
  taskState = 'DISPLAY_ALL_TASKS',
  taskAction
) => {
  switch (taskAction.type) {
    case 'SET_VISIBILITY_FILTER':
      return taskAction.filter;
    default:
      return taskState;
  }
};

const { combineReducers } = Redux;
const { createStore } = Redux;
const todoApp = combineReducers({
  todoTasks,
  taskFilter
});
const store = createStore(todoApp);

const BindTask = ({
  active,
  children,
  onClick
}) => {
  if (active) { return <span>{children}</span>; }

  return (
    <a href='#' onClick={e => {
         e.preventDefault();
         onClick();
       }} > {children} </a>
  );
};

class FilterBindings extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }
  componentWillUnmount() { this.unsubscribe(); }
  render() {
    const props = this.props;
    const taskState = store.getState();
    
    return (
      <BindTask
        active = {
          props.filter === taskState.taskFilter
        }
        onClick={() => store.dispatch(
          {
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }> {props.children}
      </BindTask>
    );
  }
}

const ToDoTaskFilterOptions = () => (
  <p className='app'>
    Filter -
    {' '}
    <FilterBindings filter = 'DISPLAY_ALL_TASKS'>
      <button className='filter-button'>All</button>
    </FilterBindings>
    {' | '}
    <FilterBindings filter = 'DISPLAY_ACTIVE_TASKS'>
     <button className='filter-button'>Progress</button>
    </FilterBindings>
    {' | '}
    <FilterBindings filter = 'DISPLAY_COMPLETED_TASKS'>
      <button className='filter-button'>Done</button>
    </FilterBindings>
  </p>
);

const ToDoTask = ({
  onClick,
  todoTaskStatus,
  todoText
}) => (
  <p>
  <li
    onClick={onClick}
    style={{
      textDecoration:
        todoTaskStatus ?
          'line-through' :
          'none'
    }}
  >{todoText} </li>
  <button className='delete-button' onClick={ () => {
        store.dispatch(
          {
          type: 'TASK_DELETE',
          todoText:todoText
        })
      }}>Delete</button>
 </p>
);

const ToDoTaskList = ({
  todoTasks,
  onTodoClick
}) => (
  <ul>
    {todoTasks.map(todo =>
      <ToDoTask
        key={todo.todoTaskId}
        {...todo}
        onClick={() => onTodoClick(todo.todoTaskId)}
      />
    )}
  </ul>
);

let ToDoTaskId = 0;
const CreateToDoTask = () => {
  let inputToDoTaskText;

  return (
    <div>
      <input placeholder='Type ToDo task text here...' ref = {
        node => {
        inputToDoTaskText = node;
      }} />
      <button className='add-button' onClick={ () => {
        store.dispatch(
          {
          type: 'TASK_ADD',
          todoTaskId: ToDoTaskId++,
          todoText: inputToDoTaskText.value
        })
        inputToDoTaskText.value = '';
      }}>
        Create
      </button>
    </div>
  );
};

const findDisplayToDoTasks = (
  todoTasks,
  filter
) => {
  switch (filter) {
    case 'DISPLAY_ALL_TASKS':
      return todoTasks;
    case 'DISPLAY_COMPLETED_TASKS':
      return todoTasks.filter(
        theTask => theTask.todoTaskStatus
      );
    case 'DISPLAY_ACTIVE_TASKS':
      return todoTasks.filter(
        theTask => !theTask.todoTaskStatus
      );
    default:
      return '';
  }
}

class DisplayToDoTaskList extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }
  
  componentWillUnmount() {
    this.unsubscribe();
  }
  
  render() {
    const taskState = store.getState();
    return (
      <ToDoTaskList
        todoTasks={
          findDisplayToDoTasks(
            taskState.todoTasks,
            taskState.taskFilter
          )
        }
        onTodoClick={todoTaskId =>
          store.dispatch({
            type: 'TASK_COMPLETE',
            todoTaskId
          })            
        }
      />
    );
  }
}

const TodoApp = () => (
  <div>
    <h1>Internship Project-1 Assignment 2</h1>
    <h2>The ToDo Application</h2>
    <h3>Group 37</h3>
    <br/>
    <CreateToDoTask />
    <DisplayToDoTaskList />
    <ToDoTaskFilterOptions />
  </div>
);

const App=()=>
{
 return (
    <div className="todo">
        <TodoApp />
    </div>
 )
};

export default App;