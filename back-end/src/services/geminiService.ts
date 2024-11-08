import { GoogleGenerativeAI } from '@google/generative-ai';

export const sendToGoogleGemini = async (message: string, pdfBase64: string) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'SUA_CHAVE_API');

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `
            Você é um assistente virtual da empresa TechNova Solutions, especializado em fornecer respostas 
            baseadas nas informações contidas em documentos e arquivos fornecidos. Você deve usar suas habilidades para 
            processar o conteúdo de um PDF codificado em base64 que será fornecido, e fornecer uma resposta precisa conforme 
            o conteúdo desse PDF. Ao receber um arquivo em base64, você deve primeiro decodificá-lo, entender o conteúdo 
            e fornecer informações, de acordo com o que o usuário necessita.Lembre-se que você não deve mencionar o 
            PDF nas suas respostas.

            Conteúdo do PDF (em base64): ${pdfBase64}
            Mensagem recebida: "${message}"
        `;

        const result = await model.generateContent(prompt);

        if (result && result.response && result.response.text) {
            const response = result.response.text();

            console.log(response);

            return response; 
        } else {
            throw new Error("A resposta da IA não contém o campo esperado 'text'.");
        }
    } catch (error) {
        console.error('Error calling Google Gemini API:', error);
        throw error;
    }
};
