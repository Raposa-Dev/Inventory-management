const markdownFile = '../../IA/llms.md';

async function fetchMarkdown() {
  try {
    const response = await fetch(markdownFile);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const data = await response.text();

    return data;

  } catch (error) {
    
    console.error('Ocorreu um erro ao buscar o arquivo:', error);
    
    return null;
  }
};
export const startTest = fetchMarkdown();