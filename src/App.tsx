import React, {useEffect, useState} from 'react';
import MessageList from './components/MessageList.tsx';
import MessageInput from './components/MessageInput.tsx';

const apiLink = 'http://146.185.154.90:8000/messages';

export interface Message {
  id: string;
  message: string;
  author: string;
  datetime: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [author] = useState('Adm');
  const [lastSendTime, setLastSendTime] = useState('');

  const fetchMessages = async () => {
    let url = apiLink;
    if (lastSendTime) {
      url += `?datetime=${lastSendTime}`;
    }
    try{
      const response = await fetch(url);
      if (!response.ok) {
        console.log("Network response wasn't ok");
      }
      const data = await response.json();
      setMessages(data);
      if (data.length > 0) {
        setLastSendTime(data[data.length -1].datetime);
      }
    }catch (error) {
      console.log('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages,3000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async (message: string) => {
    try {
      const response = await fetch (apiLink, {
        method: 'POST',
        body: JSON.stringify({
          message,
          author,
        }),
      });
      if (!response.ok) {
        console.log("Network response wasn't ok");
      }
      console.log('Message sent:', await response.json());
       await fetchMessages();
    }catch (error) {
      console.log('Error sending message:', error);
    }

  };
    return (
        <div className='App'>
            <h1>Chat App</h1>
          <MessageList messages={messages}/>
          <MessageInput onSendMessage={sendMessage}/>
        </div>
    );
};

export default App;