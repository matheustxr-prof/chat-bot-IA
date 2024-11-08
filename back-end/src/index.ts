import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  // Importa o pacote CORS
import { chatbotController } from './controllers/chatbotController.ts';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configuração do CORS
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],        
    allowedHeaders: ['Content-Type'], 
};

// Aplica o middleware CORS
app.use(cors(corsOptions));

// Middleware para lidar com o corpo da requisição (JSON)
app.use(express.json());

// Rota que chama o chatbotController diretamente
app.post('/send-message', chatbotController);

// Middleware de tratamento de erros, que deve ser definido após as rotas
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
