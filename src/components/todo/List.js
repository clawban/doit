import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

var ENTER_KEY = 13;
class List extends Component{

    constructor(props){
        super(props)

        this.remove = this.remove.bind(this)
        this.doubleClickEdit = this.doubleClickEdit.bind(this)
        this.resetEdit = this.resetEdit.bind(this)
        this.onKeyChange = this.onKeyChange.bind(this)
        this.saveEdit = this.saveEdit.bind(this)
        this.checkCompleted = this.checkCompleted.bind(this)

        this.state = {
            newTitle: props.title,
            editing: false,
            is_completed: props.is_completed
        }
    }

    componentDidUpdate (nextProp, nextState) {
        if (nextState.editing !== this.state.editing && this.state.editing === true){
            var node = ReactDOM.findDOMNode(this.refs.editList);
            node.focus();
        }
    }


    remove (id, boardId) {
        this.props.onRemoveList(id, boardId)
    }

    doubleClickEdit () {
        this.setState({
            editing: true
        })
    }
    
    resetEdit () {
        this.setState({
            editing: false
        })
    }

    saveEdit () {   
        if(this.state.newTitle && this.props.onUpdateList(this.state.newTitle, this.props.id, this.props.boardId)){
            this.resetEdit()
        }
    }

    onKeyChange (event) {
        
        if (event.which === ENTER_KEY) {
            this.saveEdit()
        }else{
            this.setState({
                newTitle: event.target.value
            })
        }
    }

    checkCompleted (e) {
        this.setState({
            is_completed: e.target.checked
        })
        
        this.props.onChecked(e.target.checked, this.props.id, this.props.boardId)
    }

    render () {

        let { editing, is_completed } = this.state
        let { boardId, title, id } = this.props

        return (                      
            <li className={classNames({
                item: true, completed: is_completed
            })}>                                                        
                <input type="checkbox" defaultChecked={is_completed} onClick={this.checkCompleted} /> 
                { !editing && <label className="checkbox" onDoubleClick={this.doubleClickEdit}>{title}</label> }

                { editing && <input type="text" className="edit" ref="editList" onBlur={this.saveEdit} defaultValue={title} onKeyUp={this.onKeyChange} /> }

                <i className="delete is-pulled-right is-small remove-list-btn" onClick={()=>this.remove(id, boardId)} ></i>         
            </li>                    
        )
    }
}

export default List;