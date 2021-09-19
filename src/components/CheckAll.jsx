import React from 'react'

function CheckAll(props) {
    return (
        <div>
            <div onClick={props.completeAllTodo} className="button">Check All</div>
        </div>
    )
}

export default CheckAll
