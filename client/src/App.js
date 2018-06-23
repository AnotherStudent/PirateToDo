import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

const URL_DB = 'http://localhost:3006/tasks/';

const ToDoItem = (props) => {
  return <div><b>{props.msg}</b></div>
};

const ToDoList = (props) => {
  if (props.tasks == null)
    return (<div>load...</div>);

  const list = props.tasks.map(item => (
    <ToDoItem
      msg={item.msg}
    />
  ));
  return (
    <div>
      { list }
    </div>
  );
};

class ToDoAddControl extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  onChangeHandler = (e) => {
    this.setState({text: e.target.value});
  }

  onBtnClickHandler = () => {
    this.props.onAdd(this.state.text);
    this.setState({text: ''});
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name="text"
          placeholder="Enter todo..."
          value={this.state.text}
          onChange={this.onChangeHandler}
        />
        <button onClick={this.onBtnClickHandler}>+</button>
      </div>
    );
  }
};


// function addProc(text) {
//   alert(text);
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {todoList: null};
  }

  componentWillMount() {
    this._asyncRequest = fetch(URL_DB).
    then(response => {
      return response.json();
    }).
    then((todoList) => {
      this.setState({todoList});
      //alert(JSON.stringify(todoList));
    });
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  addProc = (text) => {

    let todoList = this.state.todoList;
    todoList.push({msg: text, id: 23});
    this.setState({todoList: todoList});

    fetch(URL_DB, {
        method: 'POST',
        body: JSON.stringify({msg: text}),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
  };

  reset = () => {
    fetch('https://kodaktor.ru/j/db.json').
    then(response => {
      return response.json();
    }).
    then((todoList) => {

      for(let i of this.state.todoList) {
        fetch(URL_DB + i.id, {
          method: 'DELETE'
        });
      };

      this.setState({todoList: []});
      for(let i of todoList.todo) {
        this.addProc(i.title);
      };
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Pirate ToDo</h1>
        </header>
        <ToDoList tasks = {this.state.todoList}/>
        <ToDoAddControl onAdd = {this.addProc}/>
        <div>
          <br/>
          <br/>
          <button onClick = {this.reset}>Reset</button>
        </div>
      </div>
    );
  }
}

export default App;
