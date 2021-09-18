import React, { Component } from 'react'

export default class AppClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 4,
            todo: '',
            todos: [
                {
                    id: 1,
                    title: "Finish React Series",
                    isComplete: false,
                },
                {
                    id: 2,
                    title: "Do Techace Project",
                    isComplete: true,
                },
                {
                    id: 3,
                    title: "Watching Korea Series",
                    isComplete: false,
                },
            ]
        }
    }
    addToDo = (event) => {
        event.preventDefault();

        this.setState(preState => {
            const newTodos = [
                ...preState.todos,
                {
                    id: this.state.id,
                    title: this.state.todo,
                    isComplete: false
                }
            ];

            return {todos: newTodos};
        });

        this.setState({
            todo: ''
        });

        this.setState(pre => {
            return {id: pre.id+1}
        });
    }

    handleInput = (event) => {
        this.setState({
            todo: event.target.value
        })
    }

    removeTodo(id) {
        this.setState(preState => {
            const newTodos = [
                ...preState.todos.filter(todo => todo.id != id)
            ];

            return {todos: newTodos};
        });
    }

    render() {
        return (
            <div className="todo-app-container">
                <div className="todo-app">
                    <h2>Todo App</h2>
                    <form action="#" onSubmit={this.addToDo}>
                        <input
                            type="text"
                            value={this.state.todo}
                            onChange={this.handleInput}
                            className="todo-input"
                            placeholder="What do you need to do?"
                        />
                    </form>

                    <ul className="todo-list">
                        {this.state.todos.map((todo) => 
                            <li className="todo-item-container" key={todo.id}>
                            <div className="todo-item">
                                <input type="checkbox" />
                                <span className="todo-item-label">{todo.title}</span>
                                {/* <input type="text" className="todo-item-input" value="Finish React Series" /> */}
                            </div>
                            <button onClick={() => this.removeTodo(todo.id)} className="x-button">
                                <svg
                                className="x-button-icon"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                                </svg>
                            </button>
                            </li>
                        )}
                    </ul>

                    <div className="check-all-container">
                    <div>
                        <div className="button">Check All</div>
                    </div>

                    <span>3 items remaining</span>
                    </div>

                    <div className="other-buttons-container">
                    <div>
                        <button className="button filter-button filter-button-active">
                        All
                        </button>
                        <button className="button filter-button">Active</button>
                        <button className="button filter-button">Completed</button>
                    </div>
                    <div>
                        <button className="button">Clear completed</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

// export default AppClass;