import React, {Component} from 'react';

class Message extends Component {
  render() {
    if(this.props.data.type=== "incomingNotification"){
      return(
        <div className="message system">
          {this.props.data.content}
        </div>
        )
    }
    return (
      <div className="message">
        <span className="message-username">{this.props.data.username}</span>
        <div></div>
        <span className="message-content">{this.props.data.content}</span>
      </div>
    );

  }
}
export default Message;