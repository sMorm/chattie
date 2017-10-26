import React, { Component } from 'react';
import io from 'socket.io-client';

import CreateUser from './CreateUser.jsx'
import Chatbox from './Chatbox.jsx'

import './styles/App.css';

const socket = io('http://10.253.87.191:5000/', {'forceNew': true});

class App extends Component {
  state = {
    user: '',
    users: [],
    messages: []
  }

  componentDidMount = () => {
    socket.on('new-message', newmsg => {
      const { messages } = this.state
      messages.push(newmsg)
      this.setState({ messages })
    })

    socket.on('get-users', users => this.setState({ users }))
  }
  
  createUser = user => {
    this.setState({ user })
    socket.emit('new-user', user)
  }

  sendMsg = msg => msg !== '' && socket.emit('send-message', msg )

  render() {
    return (
      <div className="appContainer">
        <div className="appContent">
          {
            this.state.user !== ''
            ? <Chatbox sendMsg={this.sendMsg} messages={this.state.messages} users={this.state.users} />
            : <CreateUser createUser={this.createUser} />
          }
        </div>
      </div>
    );
  }
}

export default App;
