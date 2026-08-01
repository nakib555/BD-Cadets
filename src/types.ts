export interface LocalizedString {
  bn?: string;
  en?: string;
}

export interface Question {
  id: number;
  subject: 'GK' | 'Mathematics' | 'English' | 'Bangla';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: LocalizedString;
  options: { label: string; text: LocalizedString }[];
  correctIndex: number;
  explanation: LocalizedString;
}
