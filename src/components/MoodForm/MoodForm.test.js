import { render, screen, fireEvent } from "@testing-library/react";
import MoodForm from "./index";

// Mock styled-components
jest.mock("./styles", () => ({
  FormContainer: "div",
  Form: "form",
  Select: "select",
  TextArea: "textarea",
  Button: "button",
}));

describe("MoodForm Component", () => {
  const mockOnAddMood = jest.fn();

  beforeEach(() => {
    mockOnAddMood.mockClear();
  });

  test("renders form with all elements", () => {
    render(<MoodForm onAddMood={mockOnAddMood} />);

    expect(screen.getByText("Log Your Mood")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Happy")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Add notes...")).toBeInTheDocument();
    expect(screen.getByText("Add Mood")).toBeInTheDocument();
  });

  test("has all mood options available", () => {
    render(<MoodForm onAddMood={mockOnAddMood} />);

    const select = screen.getByDisplayValue("Happy");
    expect(select).toHaveDisplayValue("Happy");

    // Check all options exist
    expect(screen.getByText("Happy")).toBeInTheDocument();
    expect(screen.getByText("Sad")).toBeInTheDocument();
    expect(screen.getByText("Anxious")).toBeInTheDocument();
    expect(screen.getByText("Neutral")).toBeInTheDocument();
    expect(screen.getByText("Depressed")).toBeInTheDocument();
  });

  test("updates mood selection", () => {
    render(<MoodForm onAddMood={mockOnAddMood} />);

    const select = screen.getByDisplayValue("Happy");
    fireEvent.change(select, { target: { value: "Sad" } });

    expect(select).toHaveDisplayValue("Sad");
  });

  test("updates notes input", () => {
    render(<MoodForm onAddMood={mockOnAddMood} />);

    const notesInput = screen.getByPlaceholderText("Add notes...");
    fireEvent.change(notesInput, { target: { value: "Test notes" } });

    expect(notesInput).toHaveDisplayValue("Test notes");
  });

  test("submits form with correct data", () => {
    render(<MoodForm onAddMood={mockOnAddMood} />);

    const select = screen.getByDisplayValue("Happy");
    const notesInput = screen.getByPlaceholderText("Add notes...");
    const submitButton = screen.getByText("Add Mood");

    fireEvent.change(select, { target: { value: "Anxious" } });
    fireEvent.change(notesInput, { target: { value: "Feeling stressed" } });
    fireEvent.click(submitButton);

    expect(mockOnAddMood).toHaveBeenCalledWith({
      id: expect.any(Number),
      mood: "Anxious",
      notes: "Feeling stressed",
    });
  });

  test("resets form after submission", () => {
    render(<MoodForm onAddMood={mockOnAddMood} />);

    const select = screen.getByDisplayValue("Happy");
    const notesInput = screen.getByPlaceholderText("Add notes...");
    const submitButton = screen.getByText("Add Mood");

    fireEvent.change(select, { target: { value: "Sad" } });
    fireEvent.change(notesInput, { target: { value: "Test notes" } });
    fireEvent.click(submitButton);

    expect(select).toHaveDisplayValue("Happy");
    expect(notesInput).toHaveDisplayValue("");
  });
});
