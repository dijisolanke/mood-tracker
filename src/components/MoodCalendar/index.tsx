import React from "react";
import { MoodCalendarProps } from "./types";
import { CalendarContainer, DayCell, MoodIndicator } from "./styles";

const getMoodColor = (mood: string) => {
  switch (mood) {
    case "Happy":
      return "#ffeb3b"; // Yellow
    case "Sad":
      return "#2196f3"; // Blue
    case "Anxious":
      return "#f44336"; // Red
    case "Neutral":
      return "#9e9e9e"; // Grey
    default:
      return "#f9f9f9";
  }
};

const MoodCalendar: React.FC<MoodCalendarProps> = ({ moods }) => {
  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();
  const calendarDays = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  return (
    <CalendarContainer>
      {calendarDays.map((day) => {
        const moodForDay = moods.find(
          (mood) => new Date(mood.id).getDate() === day
        );
        const moodColor = moodForDay
          ? getMoodColor(moodForDay.mood)
          : "#f9f9f9"; // Default color if no mood

        return (
          <DayCell key={day} moodColor={moodColor}>
            <MoodIndicator>
              {moodForDay ? moodForDay.mood.charAt(0) : ""}
            </MoodIndicator>
            <div>{day}</div>
          </DayCell>
        );
      })}
    </CalendarContainer>
  );
};

export default MoodCalendar;
