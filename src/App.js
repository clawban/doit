import React, { Component } from 'react';
import Todo from './components/todo/Todo';
import Calendar from './components/calendar/Calendar';
import datelib from './libs/DateLib';
import firebase from './libs/Firebase';

class App extends Component {

  constructor(props){
    super(props)

    this.handleOnChangeCalendar = this.handleOnChangeCalendar.bind(this)
    this.handleOnAddBoard = this.handleOnAddBoard.bind(this)
    this.handleOnRemoveBoard = this.handleOnRemoveBoard.bind(this)
    this.handleOnUpdateBoard = this.handleOnUpdateBoard.bind(this)

    this.handleOnAddList = this.handleOnAddList.bind(this)
    this.handleOnRemoveList = this.handleOnRemoveList.bind(this)
    this.handleOnUpdateList = this.handleOnUpdateList.bind(this)
    this.handleOnChecked = this.handleOnChecked.bind(this)

    this.state = {
      date: datelib.currentDate(),
      todoData: []
    }
  }

  componentWillMount () {
    this.loadTodoData()
  }

  componentDidUpdate (nextProp, nextState) {
    if(nextState.date !== this.state.date){
       this.loadTodoData()
    }
  }

  handleOnChangeCalendar(date){
    this.setState({
      date: date
    })
  }

  handleOnAddBoard (title) {
    var newPostKey = firebase.database().ref('todos').child(this.state.date).push().key;
    var data = {
        title: title.trim()
    }
    var updates = {}
    updates['/todos/' + this.state.date + '/' + newPostKey] = data
    return firebase.database().ref().update(updates)   
  }

  handleOnRemoveBoard (boardId) {    
      return firebase.database().ref('todos/' + this.state.date + '/' + boardId).remove()
  }

  handleOnUpdateBoard (boardId, boardTitle) {
    var updates = {}
    updates['/todos/' + this.state.date + '/' + boardId + '/title/'] = boardTitle
    firebase.database().ref().update(updates)
  }

  handleOnAddList (txt, boardId) {
    var newPostKey = firebase.database().ref('todos').child(this.state.date + '/' + boardId + '/items/').push().key;
    var data = {
        title: txt.trim(),
        is_completed: false
    }
    var updates = {}
    updates['/todos/' + this.state.date + '/' + boardId + '/items/' + newPostKey] = data
    return firebase.database().ref().update(updates)   
  }

  handleOnRemoveList (id, boardId) {
    return firebase.database().ref('todos/' + this.state.date + '/' + boardId + '/items/' + id).remove()
  }

  handleOnUpdateList (newTitle, id, boardId) {
    var updates = {}
    updates['/todos/' + this.state.date + '/' + boardId + '/items/' + id + '/title/'] = newTitle
    return firebase.database().ref().update(updates)
  }

  handleOnChecked (status, id, boardId) {
    var updates = {}
    updates['/todos/' + this.state.date + '/' + boardId + '/items/' + id + '/is_completed/'] = status
    return firebase.database().ref().update(updates)
  }

  loadTodoData() {

    let itemsRef = firebase.database().ref('todos/' + this.state.date)
    itemsRef.on('value', (snapshot) => {

        let items = snapshot.val();
        let data = [];

        if(items){
            for (let item in items) { 

                let lists = items[item].items;
                let data_list = [];
                for(let list in lists){
                  data_list.push({
                    id: list,
                    title: lists[list].title,
                    is_completed: lists[list].is_completed
                  })
                }  

                data.push({
                    id: item,
                    title: items[item].title,
                    items: data_list
                });

            }
        }

        this.setState({
            todoData: data
        });
    });
  }


  render() {

    let { todoData } = this.state

    return (
      <div className="app">
        <Calendar onChangeCalendar={this.handleOnChangeCalendar} />
        <Todo 
          data={todoData}
          onAddList={this.handleOnAddList}
          onUpdateList={this.handleOnUpdateList}
          onRemoveList={this.handleOnRemoveList}
          onChecked={this.handleOnChecked}
          onAddBoard={this.handleOnAddBoard}
          onUpdateBoard={this.handleOnUpdateBoard}
          onRemoveBoard={this.handleOnRemoveBoard}  />
      </div>
    );
  }
}

export default App;
