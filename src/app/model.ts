export interface Question {
    question: string;
    options: [string, string, string, string]; // Four possible answers for each question
    correctOptionIndex: number;
}
