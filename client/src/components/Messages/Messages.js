import React from 'react'
import { connect } from 'react-redux'

import Message from './Message'
import { removeMessage } from '../../redux/actions/messagesActions'


const Messages = ({ messages, removeMessage }) => {
    return (
        <div className="messages">
            {messages.map(({ type, text }, i) => (
                <Message key={`MESSAGE-${type}-${i}`} type={type} text={text} onClick={() => removeMessage(i)} />
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    messages: state.messages,
})

export default connect(mapStateToProps, { removeMessage })(Messages)