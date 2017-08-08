import React, { Component } from 'react';

class BtnAddList extends Component{

    constructor(props){
        super(props)

        this.onClickAddListButton = this.onClickAddListButton.bind(this)
        this.cancel = this.cancel.bind(this)
        this.keyChange = this.keyChange.bind(this)
        this.saveAdd = this.saveAdd.bind(this)

        this.state = {
            displayForm: false,
            txt: ''
        }
    }

    onClickAddListButton (e) {
        e.preventDefault();
        this.setState({
            displayForm: true
        })
    }

    cancel (e) {
        e.preventDefault();
        this.setState({
            displayForm: false,
            txt: ''
        })
    }

    saveAdd (e) {
        e.preventDefault()
        if(this.props.onAddList(this.state.txt, this.props.boardId)){
            this.setState({
                displayForm: false,
                txt: ''
            })
        }
    }

    keyChange (event) {
        this.setState({
            txt: event.target.value
        })
    }

    render () {

        let { displayForm } = this.state

        return (
            <div>
                { displayForm &&
                <form className="add-todo-form" onSubmit={this.saveAdd}>
                    <div className="field">
                        <div className="control">
                            <textarea className="textarea is-small" rows="3" placeholder="Add a todo..." onKeyUp={this.keyChange}></textarea>
                        </div>
                    </div>                                        
                    <div className="control">  
                        <button className="button add-board-btn is-primary is-small ">Save</button>
                        <button className="button is-small cancle-board-btn" onClick={this.cancel} >Cancel</button>
                    </div>
                </form>  
                }   

                { !displayForm && <a className="has-text-grey-dark" href="" onClick={ this.onClickAddListButton }>Add a todo...</a>
                }
            </div>
        )
    }
}

export default BtnAddList;