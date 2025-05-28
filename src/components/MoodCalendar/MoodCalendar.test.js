import { render, screen } from "@testing-library/react";
import MoodCalendar from "./index";

// Mock styled-components
jest.mock("./styles", () => ({
  CalendarContainer: "div",
  DayCell: "div",
  MoodIndicator: "div",
}));

describe("MoodCalendar Component", () => {
  const mockOnDeleteMood = jest.fn();
  const mockNovemberDate = new Date(2024, 10, 15); // November 2024

  beforeEach(() => {
    mockOnDeleteMood.mockClear();
  });

  test("renders calendar header for November 2024", () => {
    render(
      <MoodCalendar
        moods={[]}
        onDeleteMood={mockOnDeleteMood}
        currentDate={mockNovemberDate}
      />
    );

    expect(screen.getByText("November 2024")).toBeInTheDocument();
  });

  test("displays correct number of days for November", () => {
    render(
      <MoodCalendar
        moods={[]}
        onDeleteMood={mockOnDeleteMood}
        currentDate={mockNovemberDate}
      />
    );

    // November has 30 days, so we should see day numbers 1-30
    for (let day = 1; day <= 30; day++) {
      expect(screen.getByText(day.toString())).toBeInTheDocument();
    }

    // Day 31 should not exist for November
    expect(screen.queryByText("31")).not.toBeInTheDocument();
  });

  test("displays mood for specific day", () => {
    const mockMoods = [
      {
        id: new Date(2024, 10, 15).getTime(), // November 15, 2024
        mood: "Happy",
        notes: "Good day",
      },
    ];

    render(
      <MoodCalendar
        moods={mockMoods}
        onDeleteMood={mockOnDeleteMood}
        currentDate={mockNovemberDate}
      />
    );

    // Should show the first letter of the mood
    expect(screen.getByText("H")).toBeInTheDocument();
  });

  test("shows delete button for days with moods", () => {
    const mockMoods = [
      {
        id: new Date(2024, 10, 15).getTime(),
        mood: "Happy",
        notes: "Good day",
      },
    ];

    render(
      <MoodCalendar
        moods={mockMoods}
        onDeleteMood={mockOnDeleteMood}
        currentDate={mockNovemberDate}
      />
    );

    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("handles multiple moods on different days", () => {
    const mockMoods = [
      {
        id: new Date(2024, 10, 15).getTime(),
        mood: "Happy",
        notes: "Good day",
      },
      {
        id: new Date(2024, 10, 20).getTime(),
        mood: "Sad",
        notes: "Bad day",
      },
    ];

    render(
      <MoodCalendar
        moods={mockMoods}
        onDeleteMood={mockOnDeleteMood}
        currentDate={mockNovemberDate}
      />
    );

    expect(screen.getByText("H")).toBeInTheDocument(); // Happy
    expect(screen.getByText("S")).toBeInTheDocument(); // Sad
    expect(screen.getAllByText("Delete")).toHaveLength(2);
  });

  test("uses current date as default when no currentDate provided", () => {
    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    render(<MoodCalendar moods={[]} onDeleteMood={mockOnDeleteMood} />);

    expect(screen.getByText(currentMonth)).toBeInTheDocument();
  });
});
