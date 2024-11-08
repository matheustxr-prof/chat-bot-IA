import { useState } from 'react';
import { api } from '../services/api';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (text: string) => {
    const userMessage: Message = { text, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Enviando a mensagem para a API
      const response = await api.post<{ message: string }>('/send-message', { message: text });
      
      // Verificando o que foi retornado pela API
      console.log('Resposta da API:', response.data);
      
      // Verificando se existe uma mensagem no formato esperado
      if (response.data && response.data.message) {
        const botMessage: Message = { text: response.data.message, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        console.error('A resposta da API não contém a propriedade "message".');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  return { messages, sendMessage };
};
