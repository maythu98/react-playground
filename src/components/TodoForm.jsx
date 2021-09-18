import {React, useState} from 'react'
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    addToDo: PropTypes.func.isRequired
};

  
export default function TodoForm(props) {
    const [todo, setTodo] = useState('');

    function handleInput(event)
    {
        console.log("Input");
        setTodo(event.target.value);
    }

    function addToDo(event)
    {
        event.preventDefault();

        if (todo.trim().length === 0) {
            return;
        }

        props.addToDo(todo);

        setTodo(''); 
    }

    return (
        <div>
            <form action="#" onSubmit={addToDo}>
                <input
                    type="text"
                    value={todo}
                    onChange={handleInput}
                    className="todo-input"
                    placeholder="What do you need to do?"
                />
            </form>
        </div>
    )
}
