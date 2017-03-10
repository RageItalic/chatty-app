import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: 'anonymous'},
      messages:[
        // {
        //   id:1,
        //   username: "Bob",
        //   content: "Has anyone seen my marbles?"
        // },
        // {
        //   id: 2,
        //   username: "Anonymous",
        //   content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        // }
      ],
      usercount:0
    }
  }

  componentDidMount(){
    this.socket = new WebSocket("ws://localhost:4000")
    this.socket.onmessage = (event) =>{
      console.log(event.data);
      var data = JSON.parse(event.data)
      console.log(data);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      switch(data.type) {
      case "incomingMessage":
        // handle incoming message
          const messages = this.state.messages.concat(data)
          console.log("NEW DATA" + data)
          this.setState({messages : messages})
          break;
      case "incomingNotification":
        // handle incoming notification
        const meSsages = this.state.messages.concat(data)
          console.log("NEW DATA" + data)
          this.setState({messages : meSsages})
        break;
      case "systemUpdates":
          this.setState({usercount: data.users})
          break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
      }
      //this.setState({messages : messages})
      //this.socket.send("Message Received")
    }

  }

  sendMessage = (message) => {
       const newMessage = {type: 'postMessage' ,username: this.state.currentUser.name, content: message};

      this.socket.send(JSON.stringify(newMessage));
      //this.setState(newMessage)
  }

  nameChange = (newName, callback) => {
    this.setState({
      currentUser: {name: newName}
    }, callback)
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatums</a>
          <div className="users"> {this.state.usercount} Users Online</div>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} socket={this.socket} sendMessage={this.sendMessage} nameChange={this.nameChange}/>
      </div>
    );
  }
}

export default App;
