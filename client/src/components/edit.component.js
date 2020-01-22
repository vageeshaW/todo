import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {

	constructor(props) {
        super(props);

        this.onChangeTodoItem = this.onChangeTodoItem.bind(this);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
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

    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }

	componentDidMount() {
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
            .then(response => {
                console.log(response)
                this.setState({
                	todo_item: response.data.todo_item,
                    todo_description: response.data.todo_description,
                    todo_completed: response.data.todo_completed
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
        	todo_item: this.state.todo_item,
            todo_description: this.state.todo_description,
            todo_completed: this.state.todo_completed
        };
        console.log(obj);
        axios.post('http://localhost:4000/todos/'+this.props.match.params.id+'/update', obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Item</h3>
                <form onSubmit={this.onSubmit}>
                	<div className="form-group">
                        <label>Item: </label>
                        <input type="text" className="form-control" value={this.state.todo_item} onChange={this.onChangeTodoItem} />
                    </div>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text" className="form-control" value={this.state.todo_description} onChange={this.onChangeTodoDescription} />
                    </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTodoCompleted}
                                checked={this.state.todo_completed}
                                value={this.state.todo_completed}
                        />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>                        
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}