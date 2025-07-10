import { Injectable } from '@angular/core';
import { Flashcard } from './model';

@Injectable({ providedIn: 'root' })
export class FlashcardService {
    private allFlashcards: Flashcard[] = [
        { question: 'What is the capital of Canada?', answer: 'Ottawa' },
        { question: 'Who is the Head of State?', answer: 'The King' },
        { question: 'Two responsibilities of a Canadian citizen?', answer: 'Obey the law and vote in elections' },
        { question: 'How many provinces are there in Canada?', answer: '10 provinces' },
        { question: 'What is the name of the national police force?', answer: 'Royal Canadian Mounted Police (RCMP)' },
        { question: 'What are the official languages of Canada?', answer: 'English and French' },
        { question: 'What does the Canadian flag look like?', answer: 'Red and white with a maple leaf' },
        { question: 'What is the Constitution?', answer: 'The supreme law of Canada' },
        { question: 'Who can vote in federal elections?', answer: 'Canadian citizens aged 18 or older' },
        { question: 'What are the three parts of Parliament?', answer: 'The Monarch, the Senate, and the House of Commons' },
        { question: 'What is the name of Canada\'s national anthem?', answer: 'O Canada' },
        { question: 'When is Canada Day?', answer: 'July 1' },
        { question: 'What do we remember on Remembrance Day?', answer: 'The sacrifices of veterans and fallen soldiers' },
        { question: 'Who is Canada’s current Prime Minister?', answer: 'Justin Trudeau' },
        { question: 'What are three responsibilities of the provinces?', answer: 'Education, health care, transportation' },
        { question: 'What is multiculturalism?', answer: 'The recognition and celebration of cultural diversity' },
        { question: 'What is the Canadian Charter of Rights and Freedoms?', answer: 'A part of the Constitution that protects individual rights' },
        { question: 'Who was the first Prime Minister of Canada?', answer: 'Sir John A. Macdonald' },
        { question: 'What are the Prairie provinces?', answer: 'Alberta, Saskatchewan, Manitoba' },
        { question: 'What is the economic capital of Canada?', answer: 'Toronto' }
    ];

    getRandomSet(count = 20): Flashcard[] {
        return [...this.allFlashcards]
            .sort(() => 0.5 - Math.random())
            .slice(0, count);
    }
}
