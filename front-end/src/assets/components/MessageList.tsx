import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="space-y-2 max-w-2xl mx-auto">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`p-3 w-full ${
            message.sender === 'user'
              ? 'bg-blue-500 text-white self-end radius-user'
              : 'bg-gray-200 text-black self-start radius-bot'
          } max-w-xs break-words`}
        >
          {message.sender === 'bot' ? (
            <ReactMarkdown>{message.text}</ReactMarkdown>
          ) : (
            <p>{message.text}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
