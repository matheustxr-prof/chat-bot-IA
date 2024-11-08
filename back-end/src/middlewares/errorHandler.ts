import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  // Logar o stacktrace, se disponível
  if (err instanceof Error) {
    console.error(err.stack);
  } else {
    console.error('Erro desconhecido', err);
  }

  // Retornar uma resposta genérica para o cliente
  res.status(500).json({ error: 'Erro interno no servidor.' });
};
