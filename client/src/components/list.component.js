import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_item}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td><Link to={"/edit/"+props.todo._id}>Edit</Link></td>
    </tr>
    )

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {todos: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                console.log(response)
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }



    todoList() {
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    countType(type) {
        const countTypes = this.state.todos.filter(item => item.todo_completed == false);
        return countTypes.length;
    }



    render() {
       
        return (
            <div>
                <h3>Items List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
                <h6><a>Active Task = {this.countType(false)} </a></h6>
            </div>
        )
    }
}