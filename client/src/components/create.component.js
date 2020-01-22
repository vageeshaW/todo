import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {
	constructor(props) {
        super(props);

        this.onChangeTodoItem = this.onChangeTodoItem.bind(this);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
        	todo_item: '',
            todo_description: '',
            todo_completed: false
        }
    }

    onChangeTodoItem(e) {
        this.setState({
            todo_item: e.target.value
        });
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Todo Item: ${this.state.todo_item}`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Completed: ${this.state.todo_completed}`);

        const newItem = {
            todo_item: this.state.todo_item,
            todo_description: this.state.todo_description,
            todo_completed: this.state.todo_completed
        };

        axios.post('http://localhost:4000/todos/add', newItem).then(res => console.log(res.data));

        this.props.history.push('/');
        
        this.setState({
        	todo_item: '',
            todo_description: '',
            todo_completed: false
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Item</h3>
                <form onSubmit={this.onSubmit}>
                	<div className="form-group">
                        <label>Item: </label>
                        <input type="text" className="form-control" value={this.state.todo_item} onChange={this.onChangeTodoItem} />
                    </div>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text" className="form-control" value={this.state.todo_description} onChange={this.onChangeTodoDescription} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}