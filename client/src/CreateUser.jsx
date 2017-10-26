import React, { Component } from 'react'
import io from 'socket.io-client';

export default class CreateUser extends Component {
  state = {
    user: ''
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  createUser = e => {
    e.preventDefault()
    this.props.createUser(this.state.user)
  }

  render() {
    return (
      <div>
      <form onSubmit={this.createUser}>
        <label>Enter Your Name</label>  
        <input type="text" value={this.state.user} onChange={this.onChange} name="user"/>
      </form>
      </div>
    )
  }
}
