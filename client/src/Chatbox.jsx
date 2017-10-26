import React, { Component } from 'react'

export default class Chatbox extends Component {
  state = {
    message: ''
  }

  componentDidMount = () => {
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
      <div>
        <ul>
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
          return (`${user}, `)
        })}are in the chat.
      </div>
    )
  }
}
