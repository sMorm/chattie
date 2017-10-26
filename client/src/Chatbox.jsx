import React, { Component } from 'react'

import './styles/Chatbox.css'

export default class Chatbox extends Component {
  state = {
    message: ''
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  sendMsg = e => {
    e.preventDefault()
    this.setState({ message: '' })
    this.props.sendMsg(this.state.message)
  }

  render() {
    return (
      <div className='chatContainer'>
        <ul className='chatMessages'>
          {
            this.props.messages.map((message, key) => {
              return (<li key={key}>{message.user}: {message.msg}</li>)
            })
          }
        </ul>
        <form onSubmit={this.sendMsg}>
          <input type="text" value={this.state.message} onChange={this.onChange} name="message"/>
          <button onSubmit={this.sendMsg} onClick={this.sendMsg}>SEND</button>
        </form>
        {this.props.users.map((user, key) => {
          return <strong>{`${user}${key !== (this.props.users.length - 1) ? ',' : ''} `}</strong>
        })}are in the chat.
      </div>
    )
  }
}
