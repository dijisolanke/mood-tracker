import { render, screen, fireEvent } from "@testing-library/react";
import MoodForm from "./MoodForm";

test("renders mood form", () => {
  render(<MoodForm onAddMood={() => {}} />);
  expect(screen.getByText(/Log Your Mood/i)).toBeInTheDocument();
});

test("submits form with mood data", () => {
  const mockAddMood = jest.fn();
  render(<MoodForm onAddMood={mockAddMood} />);

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "Happy" },
  });
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "Feeling great!" },
  });
  fireEvent.click(screen.getByText(/Add Mood/i));

  expect(mockAddMood).toHaveBeenCalledWith(
    expect.objectContaining({
      mood: "Happy",
      notes: "Feeling great!",
    })
  );
});
