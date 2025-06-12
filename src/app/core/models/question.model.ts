export interface Question {
    category: string;
    type: 'multiple' | 'boolean';
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    all_answers: string[]; // Para mezclar correctas/incorrectas en UI
}
