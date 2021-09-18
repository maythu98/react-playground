import '../reset.css';
import '../App.css';
import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Finish React Series",
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: "Do Techace Project",
      isComplete: true,
      isEditing: false,
    },
    {
      id: 3,
      title: "Watching Korea Series",
      isComplete: false,
      isEditing: false,
    },
  ]);

  const [todo, setTodo] = useState('');
  const [idForTodo, setIdForTodo] = useState(4);

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

    setTodo(''); 
    setIdForTodo(id => id + 1);
  }
  
  function removeTodo(id)
  {
    console.log(`Remvoe ${id}`);
    setTodos([...todos].filter(todo => todo.id != id));
  }

  function handleInput(event)
  {
    console.log("Input");
    setTodo(event.target.value);
  }

  function completeTodo(id)
  {
    const updatedTodos = todos.map(todo => {
      if(todo.id == id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    })

    setTodos(updatedTodos);
  }

  function markAsEditing(id, isEditing = true)
  {
    const updatedTodos = todos.map(todo => {
      if(todo.id == id) {
        todo.isEditing = isEditing;
      }
      return todo;
    })

    setTodos(updatedTodos);
  }

  function editTodo(event, id) {
    const updatedTodos = todos.map(todo => {
      if(todo.id == id) {
        todo.isEditing = false;
        if (event.target.value.trim().length == 0) {
          return todo;
        }

        todo.title = event.target.value;
      }
      return todo;
    })
    setTodos(updatedTodos); 
  }

  function cancelEdit(id) {
      markAsEditing(id, false)
  }


  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={addToDo}>
          <input
            type="text"
            value={todo}
            onChange={handleInput}
            className="todo-input"
            placeholder="What do you need to do?"
          />
        </form>

        <ul className="todo-list">
          {todos.map((todo) => 
            <li className="todo-item-container" key={todo.id}>
              <div className="todo-item">
                <input type="checkbox" onChange={() => completeTodo(todo.id)} checked={todo.isComplete ? 'checked': ''}/>
                {!todo.isEditing ? 
                ( <span className=
                    {`todo-item-label 
                    ${todo.isComplete ? 'line-through': ''}`
                    }
                    onDoubleClick={() => markAsEditing(todo.id)}
                  >
                    {todo.title}
                  </span>
                ) : 
                (
                  <input 
                  onBlur={(event) => editTodo(event, todo.id)}
                  onKeyDown={event => {
                    if (event.key == 'Enter') {
                      editTodo(event, todo.id)
                    }else if (event.key == 'Escape') {
                      cancelEdit(todo.id)
                    }
                  }}
                  type="text" 
                  className="todo-item-input" 
                  defaultValue={todo.title} 
                  autoFocus/>
                )
                }
              </div>
              <button onClick={() => removeTodo(todo.id)} className="x-button">
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
  );
}

export default App;
