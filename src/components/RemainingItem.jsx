import React from 'react'

function RemainingItem(props) {
    return (
        <span> {props.getRemaining()} items remaining</span>
    )
}

export default RemainingItem
