import React, { Component } from 'react'

import './styles/CreateUser.css'

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
      <div className="createUserContainer">
      <form onSubmit={this.createUser} className="createUserForm">
        <label>USERNAME</label>  
        <input type="text" value={this.state.user} onChange={this.onChange} name="user"/>
      </form>
      </div>
    )
  }
}
