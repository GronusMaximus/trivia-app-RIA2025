export interface Question {
    readonly category: string;
    readonly type: 'multiple' | 'boolean';
    readonly difficulty: string;
    readonly question: string;
    readonly correct_answer: string;
    readonly incorrect_answers: readonly string[];
    readonly all_answers: readonly string[];
}
