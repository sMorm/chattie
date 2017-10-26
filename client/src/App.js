import React, { Component } from 'react';
import io from 'socket.io-client';

import CreateUser from './CreateUser.jsx'
import Chatbox from './Chatbox.jsx'

import './App.css';

const socket = io('http://localhost:5000', {'forceNew': true});

class App extends Component {
  state = {
    user: '',
    users: [],
    messages: []
  }

  componentDidMount = () => {
    socket.on('connection', res => console.log(res))

    socket.on('message', newmsg => {
      const { messages } = this.state
      messages.push(newmsg)
      this.setState({ messages })
    })

    socket.on('new-user', users => {
      this.setState({ users })
    })
  }

  componentWillUnmount = () => {
    if(this.state.user !== '')
      socket.emit('disconnect', this.state.user)
  }
  
  createUser = user => {
    this.setState({ user })
    socket.emit('new-user', user)
  }

  sendMsg = msg => {
    const { user } = this.state
    socket.emit('message', { msg, user } )
  }

  render() {
    return (
      <div className="App">
      {
        this.state.user !== ''
        ? <Chatbox sendMsg={this.sendMsg} messages={this.state.messages} users={this.state.users} />
        : <CreateUser createUser={this.createUser} />
      }
      </div>
    );
  }
}

export default App;
