import React from 'react'

function FilterTodo(props) {
    return (
        <div>
            <button 
                onClick={() => props.setFilter('all')} 
                className={`button filter-button ${props.filter == 'all' ? 'filter-button-active' : ''} `}
            >
              All
            </button>

            <button 
                onClick={() => props.setFilter('active')} 
                className={`button filter-button ${props.filter == 'active' ? 'filter-button-active' : ''} `}
            >
                Active
            </button>

            <button 
                onClick={() => props.setFilter('complete')} 
                className={`button filter-button ${props.filter == 'complete' ? 'filter-button-active' : ''} `}
            >
                Completed
            </button>
        </div>
    )   
}

export default FilterTodo
