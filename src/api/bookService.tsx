import apiClient from "./apiClient";

export const searchBooks = async (query: string) => {
  try {
    const response = await apiClient.get(`https://openlibrary.org/search.json?q=${query}`);
    return response.data.docs || [];  // pegar 'docs' e não 'items'
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return [];
  }
};
