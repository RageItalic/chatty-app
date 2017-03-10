import React, {Component} from 'react';

class Message extends Component {
  render() {
    const color = {color: this.props.data.color}
    if(this.props.data.type=== "incomingNotification"){
      return(
        <div className="message system">
          {this.props.data.content}
        </div>
        )
    }
    return (
      <div className="message">
        <span className="message-username" style={color}>{this.props.data.username}</span>
        <div></div>
        <span className="message-content">{this.props.data.content}</span>
      </div>
    )

  }
}
export default Message;