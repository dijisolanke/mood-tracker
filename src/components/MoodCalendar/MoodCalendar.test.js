import React from "react";
import { render, screen } from "@testing-library/react";
import MoodCalendar from "./MoodCalendar";

test("renders mood calendar", () => {
  const mockMoods = [
    { id: 1, mood: "Happy", notes: "Good day" },
    { id: 2, mood: "Sad", notes: "Bad day" },
  ];
  render(<MoodCalendar moods={mockMoods} onDeleteMood={() => {}} />);
  expect(screen.getByText(/November 2024/i)).toBeInTheDocument();
});

test("displays correct number of days", () => {
  render(<MoodCalendar moods={[]} onDeleteMood={() => {}} />);
  const dayCells = screen.getAllByRole("button");
  expect(dayCells.length).toBe(30); // Assuming November 2024
});
