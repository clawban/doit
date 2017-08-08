import React, { Component } from 'react';
import Board from './Board';
import List from './List';
import BtnAddList from './BtnAddList';
import './Todo.css'

class Todo extends Component{

    constructor(props){
        super(props)
        
        this.onSubmitAddBoard = this.onSubmitAddBoard.bind(this)
        this.boardKeypress = this.boardKeypress.bind(this)
        this.cancleAddBoard = this.cancleAddBoard.bind(this)
        this.handleOnRemoveBoard = this.handleOnRemoveBoard.bind(this)
        this.handleOnUpdateBoard = this.handleOnUpdateBoard.bind(this)

        this.handleOnAddList = this.handleOnAddList.bind(this)
        this.handleOnRemoveList = this.handleOnRemoveList.bind(this)
        this.handleOnUpdateList = this.handleOnUpdateList.bind(this)
        this.handleOnChecked = this.handleOnChecked.bind(this)

        this.state = {
            data: props.data,
            displayAddBoardForm: false,
            boardTitle: ''
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.state.data) {
            this.setState({
                data: nextProps.data
            })
        } 
    }

    boardKeypress (event) {
        this.setState({
            boardTitle: event.target.value
        })
    }

    cancleAddBoard () {
        this.setState({
            displayAddBoardForm: false,
            boardTitle: ''
        })
    }

    handleOnRemoveBoard(boardId) {
        this.props.onRemoveBoard(boardId)
    }

    handleOnUpdateBoard(boardId, boardTitle){
        this.props.onUpdateBoard(boardId, boardTitle)
    }

    handleOnAddList (txt, boardId) {
        return this.props.onAddList(txt, boardId)
    }    

    onSubmitAddBoard (e) {
        e.preventDefault();
        if (this.state.boardTitle) {
            if(this.props.onAddBoard(this.state.boardTitle)){
                this.cancleAddBoard()
            }
        }
    }

    handleOnRemoveList (id, boardId) {
        this.props.onRemoveList(id, boardId)
    }
    
    handleOnUpdateList (newTitle, id, boardId) {
        return this.props.onUpdateList(newTitle, id, boardId)
    }

    handleOnChecked (status, id, boardId) {
        return this.props.onChecked(status, id, boardId)
    }

    render () {

        let { data } = this.props
        let { displayAddBoardForm, boardTitle } = this.state

        return (
            <div className="section block-todo-list">
                <section className="container">
                    <div className="columns row-scroll">   

                        { data && data.map((board, i) =>                             
                            <Board 
                                key={board.id} 
                                id={board.id} 
                                title={board.title} 
                                onRemoveBoard={()=>this.handleOnRemoveBoard(board.id)} onUpdateBoard={this.handleOnUpdateBoard} >
                                
                                    <div className="todo-list">
                                        <ul>
                                            { board.items && board.items.map((list)=>   
                                                <List key={list.id} 
                                                    boardId={board.id} 
                                                    id={list.id}
                                                    title={list.title}
                                                    is_completed={list.is_completed}
                                                    onRemoveList={this.handleOnRemoveList} 
                                                    onUpdateList={this.handleOnUpdateList}
                                                    onChecked={this.handleOnChecked} /> 
                                                        
                                            )}  
                                            <BtnAddList onAddList={this.handleOnAddList} boardId={board.id} />   
                                        </ul> 
                                    </div>            
                            </Board>
                        )}
                        
                        <div className="column is-one-third">  
                            <form onSubmit={this.onSubmitAddBoard}>
                                <div className="field">
                                    <div className="control">
                                        <input className="input" type="text" placeholder="Add a board..." maxLength="30" onClick={()=>this.setState({displayAddBoardForm: true})} onChange={this.boardKeypress} value={boardTitle} />
                                    </div>
                                </div>    

                            { displayAddBoardForm &&            
                                <div className="control">  
                                    <button className="button add-board-btn is-primary is-small ">Save</button>
                                    <button className="button is-small cancle-board-btn" onClick={this.cancleAddBoard} >Cancel</button>
                                </div>
                            }  
                            </form>
                        </div>                                                        
                    </div> 
                    
                    { !data &&
                    <div className="columns">
                        <div className="column has-text-centered content">
                            <h1 class="title is-size-1">Add Your First List</h1>
                            <h2 class="subtitle">in a board...</h2>
                        </div>
                    </div>   
                    }                    
                </section>
            </div>  
        )
    }
}

export default Todo;