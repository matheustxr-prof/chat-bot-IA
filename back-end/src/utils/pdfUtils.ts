import fs from 'fs';
import path from 'path';

export const readPdfAsBase64 = (): string => {
    try {
        // Caminho fixo para o arquivo PDF na pasta 'assets' (dentro de 'src')
        const resolvedPath = path.resolve(__dirname, '../../assets/documento.pdf');
        
        // Lê o arquivo PDF
        const file = fs.readFileSync(resolvedPath);
        
        // Retorna o conteúdo do arquivo em base64
        return file.toString('base64');
    } catch (error) {
        console.error('Error reading PDF file:', error);
        throw error;
    }
};
