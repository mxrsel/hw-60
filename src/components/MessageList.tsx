import React from 'react';
import {Message} from '../App.tsx';

interface Props{
  messages: Message[];
}

const MessageList: React.FC<Props> = ({messages}) => {
  return (
    <div className='messageList'>
      {messages.map((message) => (
        <div key={message.id} className='message'>
          <strong>{message.author}:</strong> {message.message}
          <br/>
          <small>{new Date(message.datetime).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default MessageList;