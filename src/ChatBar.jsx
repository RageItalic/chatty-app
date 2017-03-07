import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super()
    this.state = { message: ''}
  }

  handleMessageChange = (event) => {
    this.setState({message: event.target.value})
  }
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.pressEnter(this.state.message)
      this.setState({message: ''})
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.message} onChange={this.handleMessageChange} onKeyPress={this.handleKeyPress} />
      </footer>
    );
  }
}

export default ChatBar;