import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import RemainingItem from './RemainingItem';
import ClearComplete from './ClearComplete';
import CheckAll from './CheckAll';
import FilterTodo from './FilterTodo';
import useToggle from '../hooks/useToggle';

TodoList.prototypes = {
    todos: PropTypes.object.isRequired,
    completeTodo: PropTypes.func.isRequired,
    getRemaining: PropTypes.func.isRequired,
    clearCompleted: PropTypes.func.isRequired,
    completeAllTodo: PropTypes.func.isRequired,
    todoFilter: PropTypes.func.isRequired,
}

export default function TodoList(props) {
    const [oneToggle, setOneToggle] = useToggle();
    const [secondToggle, setSecondToggle] = useToggle(false);

    const [filter, setFilter] = useState('all');

    return (
        <>
        <ul className="todo-list">
          {props.todoFilter(filter).map((todo) => 
            <li className="todo-item-container" key={todo.id}>
              <div className="todo-item">
                <input type="checkbox" onChange={() => props.completeTodo(todo.id)} checked={todo.isComplete ? 'checked': ''}/>
                {!todo.isEditing ? 
                ( <span className=
                    {`todo-item-label 
                    ${todo.isComplete ? 'line-through': ''}`
                    }
                    onDoubleClick={() => props.markAsEditing(todo.id)}
                  >
                    {todo.title}
                  </span>
                ) :   
                (
                  <input 
                  onBlur={(event) => props.editTodo(event, todo.id)}
                  onKeyDown={event => {
                    if (event.key == 'Enter') {
                      props.editTodo(event, todo.id)
                    }else if (event.key == 'Escape') {
                      props.cancelEdit(todo.id)
                    }
                  }}
                  type="text" 
                  className="todo-item-input" 
                  defaultValue={todo.title} 
                  autoFocus/>
                )
                }
              </div>
              <button onClick={() => props.removeTodo(todo.id)} className="x-button">
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

        <div className="toggle">
          <button onClick={setOneToggle} className="button">Features One Toggle</button>
          <button onClick={setSecondToggle} className="button">Features Two Toggle</button>
        </div>

        {oneToggle && (
          <div className="check-all-container">
            <div>
                <CheckAll completeAllTodo={props.completeAllTodo}/>
            </div>

            <RemainingItem getRemaining={props.getRemaining}/>
          </div>
        )}

        {secondToggle && (
          <div className="other-buttons-container">
            <div>
              <FilterTodo filter={filter} setFilter={setFilter} />
            </div>
            <div>
              <ClearComplete clearComplete={props.clearCompleted}/>
            </div>
          </div>
        )}
        </>
    )
}
