import { Mood } from '../MoodForm/types';

export interface MoodCalendarProps {
  moods: Mood[];
  onDeleteMood: (id: number) => void;
  currentDate?: Date;
}
