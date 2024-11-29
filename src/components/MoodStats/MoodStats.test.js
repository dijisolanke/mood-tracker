import React from "react";
import { render, screen } from "@testing-library/react";
import MoodStats from "./MoodStats";

test("renders mood statistics", () => {
  const mockMoods = [
    { id: 1, mood: "Happy", notes: "Good day" },
    { id: 2, mood: "Happy", notes: "Another good day" },
    { id: 3, mood: "Sad", notes: "Bad day" },
  ];
  render(<MoodStats moods={mockMoods} />);
  expect(screen.getByText(/Total Entries: 3/i)).toBeInTheDocument();
  expect(screen.getByText(/Most Common Mood: Happy/i)).toBeInTheDocument();
});
