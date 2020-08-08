import React from 'react'


const Message = ({ type, text, onClick }) => {
    return (
        <div className={`message message-${type}`} onClick={onClick}>
            {text}
        </div>
    )
}

export default Message