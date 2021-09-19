import {React, useState, useContext} from 'react'
// import PropTypes from 'prop-types';
import { TodosContent } from '../content/TodosContent';

// TodoForm.propTypes = {
//     addToDo: PropTypes.func.isRequired
// };

  
export default function TodoForm() {
    const {todos, setTodos, idForTodo, setIdForTodo } = useContext(TodosContent);

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

        setTodos([
            ...todos, 
            {
              id: idForTodo,
              title: todo,
              isComplete: false,
              isEditing: false,
            }
        ]);
      
        setIdForTodo(id => id + 1);

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
