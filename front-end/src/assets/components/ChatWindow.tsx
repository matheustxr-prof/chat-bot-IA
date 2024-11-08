import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChat } from '../hooks/useChat';

const ChatWindow: React.FC = () => {
  const { messages, sendMessage } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenChat = () => {
    if (!isOpen) setIsOpen(true);
  };

  const handleCloseChat = () => {
    // Delay para permitir a animação de fechamento
    setIsOpen(false);
  };

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    await sendMessage(message);
    setIsLoading(false);
  };

  return (
    <>
      {/* Botão de chat com animação de expansão e fechamento */}
      <div
        
        className={`fixed bottom-5 right-5 z-0 text-white shadow-lg focus:outline-none cursor-pointer chat-button ${
          isOpen ? 'open' : 'flex items-center justify-center'
        }`}
      >
        {!isOpen ? (
          <div onClick={!isOpen ? handleOpenChat : handleCloseChat} className='shadow-lg'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
              />
            </svg>
          </div>
        ) : (
          <div className="h-full z-20">
            <div className="w-full h-fit flex items-center justify-between px-4 py-5 bg-blue-500 text-white rounded-t-lg">
              <h1 className="text-lg font-semibold">Chat GPT</h1>
              <button onClick={handleCloseChat} className="focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className='h-full max-h-[382px] flex flex-col justify-end'>
              <div className="h-auto p-4 overflow-y-auto">
                <MessageList messages={messages} />
                {isLoading && (
                  <div className="mt-4 text-gray-500 animate-pulse">
                    Digitando...
                  </div>
                )}
              </div>

              <div className="h-fit p-4 border-t">
                <MessageInput onSend={handleSendMessage} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatWindow;
