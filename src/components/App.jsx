import '../reset.css';
import '../App.css';
import NotFound from './NotFound';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect, useRef } from 'react';
import { TodosContent } from '../content/TodosContent';


function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  // useState([
  //   {
  //     id: 1,
  //     title: "Finish React Series",
  //     isComplete: false,
  //     isEditing: false,
  //   },
  //   {
  //     id: 2,
  //     title: "Do Techace Project",
  //     isComplete: true,
  //     isEditing: false,
  //   },
  //   {
  //     id: 3,
  //     title: "Watching Korea Series",
  //     isComplete: false,
  //     isEditing: false,
  //   },
  // ]);

  // const [idForTodo, setIdForTodo] = useState(4);
  const [idForTodo, setIdForTodo] = useLocalStorage('id', 1);

  const [name, setName] = useLocalStorage('name', null);
  const nameRef = useRef();
  
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
  
  function getRemaining() {
    return todos.filter(todo => !todo.isComplete).length;
  }

  function clearCompleted() {
    setTodos([...todos].filter(todo => !todo.isComplete));
  }

  function completeAllTodo() {
    const newTodo = todos.map(todo => {
      todo.isComplete = true;
      return todo;
    })
    setTodos(newTodo);
  }

  function todoFilter(filter = 'all') {
    if (filter == 'active') {
      return todos.filter(todo => !todo.isComplete);
    }else if (filter == 'complete') {
      return todos.filter(todo => todo.isComplete);
    }

    return todos;
  }

  useEffect(() => {
    nameRef.current.focus();
    // setName(JSON.parse(localStorage.getItem('name')) ?? '');
        return () => {
      console.log('Clean Up Funtion');
    }
  }, [])

  
  function handleInput(event)
  {
    setName(event.target.value);
    // localStorage.setItem('name', JSON.stringify(event.target.value));
  }

  return (
    <TodosContent.Provider value={{todos, setTodos, idForTodo, setIdForTodo}}>
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Your Name</h2>
        <input type="text" value={name} ref={nameRef} onChange={handleInput} className="todo-item-input" placeholder="Type Your Name"/>
        <br />
        {name && (
          <p>Hello, {name}</p>
        )}
        <br />
        <h2>Todo App</h2>
        <TodoForm/>

        {todos.length != 0 ?  
          <TodoList 
          todos={todos}
          completeTodo={completeTodo}
          markAsEditing={markAsEditing}
          editTodo={editTodo}
          cancelEdit={cancelEdit}
          removeTodo={removeTodo}
          getRemaining={getRemaining}
          clearCompleted={clearCompleted}
          completeAllTodo={completeAllTodo}
          todoFilter={todoFilter}
          /> 
          : <NotFound /> }

      </div>
    </div>
    </TodosContent.Provider>
  );
}

export default App;
