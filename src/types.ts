export interface Question {
  id: number;
  subject: 'GK' | 'Mathematics' | 'English' | 'Bangla';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  year?: number;
  partName?: string;
  chapterName?: string;
  question: string;
  options: { label: string; text: string }[];
  correctIndex: number;
  explanation: string;
}
