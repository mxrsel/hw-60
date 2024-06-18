import React, {useState} from 'react';

interface Props {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<Props> = ({onSendMessage}) => {

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage !== '') {
      onSendMessage(newMessage);
      setNewMessage('')
    }
  };

  return (
    <div className='messageInput'>
      <input type='text' placeholder='type message' value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>

      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;