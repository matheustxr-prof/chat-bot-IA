import React, { useState } from 'react';

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        className="w-2/3 flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Digite sua mensagem..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSend();
        }}
      />
      <button
        onClick={handleSend}
        className="w-1/3 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Enviar
      </button>
    </div>
  );
};

export default MessageInput;
