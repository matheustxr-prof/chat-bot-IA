import React from 'react';
import ChatWindow from './assets/components/ChatWindow';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ChatWindow />
    </div>
  );
};

export default App;
