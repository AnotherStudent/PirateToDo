import React, { Component } from 'react';
import DATA from './data';
import './todo.css';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const Todo = props => (
  <div className="singleTodo">
    <div className="textContent">
      <div className="singleTodoContent">
        <ReactMarkdown source={props.children} />
        <div className="singleTodoButtons">
        </div>
      </div>
    </div>
  </div>
);

Todo.propTypes = {
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired;
};





class TodoBox extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }
  render() {
    return (
      <div className="container">
        <div className="todos">
          <h2>Todos:</h2>
          <TodoList data={DATA} />
        </div>
        <div className="form">
          <TodoForm />
        </div>
      </div>
    );
  }
}





const TodoList = (props) => {
  const todoNodes = props.data.map(todo => (
    <Todo
      key={todo._id}
      id={todo._id}
    >
      { todo.text}
    </Todo>
  ));
  return (
    <div>
      { todoNodes }
    </div>
  );
};

TodoList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  })),
 };

TodoList.defaultProps = {
  data: [],
};





const TodoForm = props => (
  <form onSubmit={props.submitTodo}>
    <input
      type="text"
      name="text"
      placeholder="You need to..."
      value={props.text}
      onChange={props.handleChangeText}
    />
    <button type="submit">Oh, yeah</button>
  </form>
);

TodoForm.propTypes = {
  submitTodo: PropTypes.func.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  text: PropTypes.string,
};

TodoForm.defaultProps = {
  text: '',
};

export default Todo;
export default TodoForm;
export default TodoList;
export default TodoBox;