import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
        <div>
          {
            this.props.messages.map((messageData, number) => {
              return (
                <Message data={messageData} key={number}/>
              )
            })
          }
        </div>
    );
  }
}
export default MessageList;