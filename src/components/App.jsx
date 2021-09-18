import '../reset.css';
import '../App.css';
import NotFound from './NotFound';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
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

  const [idForTodo, setIdForTodo] = useState(4);

  function addToDo(todo)
  {
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
  }
  
  function removeTodo(id)
  {
    console.log(`Remvoe ${id}`);
    setTodos([...todos].filter(todo => todo.id != id));
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
        <TodoForm addToDo={addToDo}/>

        {todos.length != 0 ?  
          <TodoList 
          todos={todos}
          completeTodo={completeTodo}
          markAsEditing={markAsEditing}
          editTodo={editTodo}
          cancelEdit={cancelEdit}
          removeTodo={removeTodo}
          /> 
          : <NotFound /> }

      </div>
    </div>
  );
}

export default App;
