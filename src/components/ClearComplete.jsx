import React from 'react'

function ClearComplete(props) {
    return (
        <button onClick={props.clearComplete} className="button">Clear completed</button>
    )
}

export default ClearComplete
