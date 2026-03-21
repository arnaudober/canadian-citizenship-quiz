export type Lang = 'en' | 'fr';

export interface Translations {
  title: string;
  startAgain: string;
  correct: string;
  seeResults: string;
  nextQuestion: string;
  perfectScore: string;
  greatJob: string;
  goodEffort: string;
  keepPracticing: string;
  percentCorrect: string;
  reviewIncorrect: string;
  startNewSet: string;
  questionProgress: string;
}

export const TRANSLATIONS: Record<Lang, Translations> = {
  en: {
    title: 'Citizenship Quiz',
    startAgain: 'Start again',
    correct: 'correct',
    seeResults: 'See results',
    nextQuestion: 'Next question',
    perfectScore: 'Perfect score! 🏆',
    greatJob: 'Great job! 🎉',
    goodEffort: 'Good effort! 💪',
    keepPracticing: 'Keep practicing! 📚',
    percentCorrect: '% correct',
    reviewIncorrect: 'Review incorrect answers',
    startNewSet: 'Start new set',
    questionProgress: 'Question {0} of {1}',
  },
  fr: {
    title: 'Quiz de citoyenneté',
    startAgain: 'Recommencer',
    correct: 'correct',
    seeResults: 'Voir les résultats',
    nextQuestion: 'Question suivante',
    perfectScore: 'Score parfait ! 🏆',
    greatJob: 'Excellent ! 🎉',
    goodEffort: 'Bon effort ! 💪',
    keepPracticing: 'Continuez ! 📚',
    percentCorrect: '% correct',
    reviewIncorrect: 'Révision des réponses incorrectes',
    startNewSet: 'Nouveau quiz',
    questionProgress: 'Question {0} sur {1}',
  },
};
