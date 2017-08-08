import React, { Component } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom'

var ENTER_KEY = 13;
    
class Board extends Component{

    constructor(props){
        super(props)

        this.removeBoard = this.removeBoard.bind(this)
        this.doubleClick = this.doubleClick.bind(this)
        this.changing = this.changing.bind(this)
        this.cancel = this.cancel.bind(this)
        this.submit = this.submit.bind(this)

        this.state = {
            updating: false,
            newTitle: this.props.title,
        }
    }

    componentDidUpdate (nextProp, nextState) {
        if (nextState.updating !== this.state.updating && this.state.updating === true){
            var node = ReactDOM.findDOMNode(this.refs.editField);
            node.focus();
        }
    }

    removeBoard (boardId) {
        this.props.onRemoveBoard(boardId)
    }

    doubleClick () {
        this.setState({
            updating: true
        })        
    }

    changing (event) {
        
        if (event.which === ENTER_KEY) {
            this.cancel()
        }else{
            this.setState({
                newTitle: event.target.value
            })
        }
    }

    cancel () {
        this.setState({
            updating: false
        })
        this.submit()
    }

    submit () {
        this.props.onUpdateBoard(this.props.id, this.state.newTitle.trim())
    }

    render () {
        
        let { id } = this.props
        let { updating, newTitle } = this.state

        return (            
            <div className="column is-one-third" >  
                <div className="board">
                    <header className={classNames({updating: updating})}>
                        { !updating && 
                        <h1 className="title is-6" onDoubleClick={this.doubleClick} >
                         {newTitle}                            
                        </h1>
                        }

                        { updating && 
                        <input type="text" className="input edit" maxLength="30" ref="editField" onKeyUp={this.changing} onBlur={this.cancel} defaultValue={newTitle} />
                        }

                        <button className="delete is-pulled-right remove-board-btn" onClick={()=>this.removeBoard(id)} ></button>
                    </header>                
                    {this.props.children}                    
                </div>
            </div>
        )
    }
}

export default Board;