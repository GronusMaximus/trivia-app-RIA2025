// Modelo para la respuesta de categorías de OpenTDB
export interface Category {
    id: number;
    name: string;
}

export interface CategoryResponse {
    trivia_categories: Category[];
}
