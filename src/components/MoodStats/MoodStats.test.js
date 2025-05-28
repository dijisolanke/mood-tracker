import { render, screen } from "@testing-library/react";
import MoodStats from "./index";
// Mock styled-components
jest.mock("./styles", () => ({
  StatsContainer: ({ children }) => <div>{children}</div>,
  StatItem: ({ children }) => <div>{children}</div>,
}));

describe("MoodStats Component", () => {
  test("renders mood statistics heading", () => {
    render(<MoodStats moods={[]} />);
    expect(screen.getByText("Mood Statistics")).toBeInTheDocument();
  });

  test("displays correct total entries count", () => {
    const mockMoods = [
      { id: 1, mood: "Happy", notes: "Good day" },
      { id: 2, mood: "Happy", notes: "Another good day" },
      { id: 3, mood: "Sad", notes: "Bad day" },
    ];

    render(<MoodStats moods={mockMoods} />);
    expect(screen.getByText("Total Entries: 3")).toBeInTheDocument();
  });

  test("displays most common mood correctly", () => {
    const mockMoods = [
      { id: 1, mood: "Happy", notes: "Good day" },
      { id: 2, mood: "Happy", notes: "Another good day" },
      { id: 3, mood: "Sad", notes: "Bad day" },
    ];

    render(<MoodStats moods={mockMoods} />);
    expect(
      screen.getByText("Most Common Mood: Happy (2 times)")
    ).toBeInTheDocument();
  });

  test("handles single mood entry", () => {
    const mockMoods = [{ id: 1, mood: "Neutral", notes: "Okay day" }];

    render(<MoodStats moods={mockMoods} />);
    expect(screen.getByText("Total Entries: 1")).toBeInTheDocument();
    expect(
      screen.getByText("Most Common Mood: Neutral (1 times)")
    ).toBeInTheDocument();
  });

  test("handles tie in mood frequency", () => {
    const mockMoods = [
      { id: 1, mood: "Happy", notes: "Good day" },
      { id: 2, mood: "Sad", notes: "Bad day" },
    ];

    render(<MoodStats moods={mockMoods} />);
    expect(screen.getByText("Total Entries: 2")).toBeInTheDocument();
    // Should show the first one encountered in the tie
    expect(
      screen.getByText(/Most Common Mood: (Happy|Sad) \(1 times\)/)
    ).toBeInTheDocument();
  });
});
