export interface Mood {
    id: number;
    mood: string;
    notes?: string;
  }
  
  export interface MoodFormProps {
    onAddMood: (mood: Mood) => void;
  }
  