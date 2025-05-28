import React from "react";
import { MoodCalendarProps } from "./types";
import { CalendarContainer, DayCell, MoodIndicator } from "./styles";

const getMoodColor = (mood: string) => {
  const moodColors = {
    Happy: "#4CAF50",
    Sad: "#2196F3",
    Anxious: "#F44336",
    Neutral: "#9E9E9E",
    Depressed: "#eacd0b",
  };
  return moodColors[mood as keyof typeof moodColors] || "#f9f9f9";
};

const MoodCalendar: React.FC<MoodCalendarProps> = ({
  moods,
  onDeleteMood,
  currentDate = new Date(),
}) => {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarDays = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  return (
    <div>
      <h2>
        {currentDate.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </h2>
      <CalendarContainer>
        {calendarDays.map((day) => {
          const moodForDay = moods.find((mood) => {
            const moodDate = new Date(mood.id);
            return (
              moodDate.getFullYear() === currentYear &&
              moodDate.getMonth() === currentMonth &&
              moodDate.getDate() === day
            );
          });

          const moodColor = moodForDay
            ? getMoodColor(moodForDay.mood)
            : "#f9f9f9";

          return (
            <DayCell key={day} moodColor={moodColor}>
              <div>{day}</div>
              <MoodIndicator>
                {moodForDay ? moodForDay.mood.charAt(0) : ""}
              </MoodIndicator>
              {moodForDay && (
                <button onClick={() => onDeleteMood(moodForDay.id)}>
                  Delete
                </button>
              )}
            </DayCell>
          );
        })}
      </CalendarContainer>
    </div>
  );
};

export default MoodCalendar;
