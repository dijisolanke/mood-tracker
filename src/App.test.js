import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 0,
};
Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
  writable: true,
});

// Mock styled-components to avoid styling issues in tests
jest.mock("styled-components", () => {
  const styled = {
    div: (styles) => (props) => <div {...props} />,
    // add more as needed like styled.button, etc.
  };
  return { __esModule: true, default: styled };
});

// Mock the child components to avoid their styled-component dependencies
jest.mock("./components/MoodForm", () => {
  return function MockMoodForm({ onAddMood }) {
    return (
      <div>
        <h2>Log Your Mood</h2>
        <button
          onClick={() =>
            onAddMood({ id: Date.now(), mood: "Happy", notes: "" })
          }
        >
          Add Mood
        </button>
      </div>
    );
  };
});

jest.mock("./components/MoodCalendar", () => {
  return function MockMoodCalendar({ moods, onDeleteMood }) {
    return (
      <div>
        <h2>Calendar</h2>
        {moods.map((mood) => (
          <div key={mood.id}>
            {mood.mood}
            <button onClick={() => onDeleteMood(mood.id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  };
});

jest.mock("./components/MoodStats", () => {
  return function MockMoodStats({ moods }) {
    return (
      <div>
        <h2>Mood Statistics</h2>
        <div>Total Entries: {moods.length}</div>
      </div>
    );
  };
});

describe("App Component", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  test("renders main heading and all components", () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<App />);

    expect(screen.getByText("Daily Mood Tracker")).toBeInTheDocument();
    expect(screen.getByText("Log Your Mood")).toBeInTheDocument();
    expect(screen.getByText("Mood Statistics")).toBeInTheDocument();
  });

  test("loads moods from localStorage on mount", () => {
    const savedMoods = JSON.stringify([
      { id: 1, mood: "Happy", notes: "Test note" },
    ]);
    localStorageMock.getItem.mockReturnValue(savedMoods);

    render(<App />);
    expect(localStorageMock.getItem).toHaveBeenCalledWith("moods");
  });

  test("saves moods to localStorage when new mood is added", () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<App />);

    // Add a mood
    const submitButton = screen.getByText("Add Mood");
    fireEvent.click(submitButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "moods",
      expect.stringContaining('"mood":"Happy"')
    );
  });
});
