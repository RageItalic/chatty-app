import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props)
    this.state = { message: '', username: props.currentUser.name}
  }

  handleMessageChange = (event) => {
    this.setState({message: event.target.value})
  }
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.nameChange(
        this.state.username,
        () => {
          this.props.sendMessage(this.state.message)
          this.setState({message: ''})
        }
      )
      //this.props.sendMessage(this.state.message)
    }
  }

  handleNameChange = (event) => {
    this.setState({username: event.target.value})
  }
  handleNameKeyPress = (event) => {
    if (event.key === 'Enter') {
      const newMessage = {type: 'postNotification', content: this.state.username + " changed their name to " + event.target.value}
      console.log(this.state.username + " changed their name to " + event.target.value)
      this.props.socket.send(JSON.stringify(newMessage))
      this.setState({username: event.target.value});
      this.props.nameChange(this.state.username)

    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.state.username} onKeyPress={this.handleNameKeyPress}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.message} onChange={this.handleMessageChange} onKeyPress={this.handleKeyPress} />
      </footer>
    );
  }
}

export default ChatBar;