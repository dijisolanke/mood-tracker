import React, { useState } from "react";
import { Mood, MoodFormProps } from "./types";
import { FormContainer, Form, Select, TextArea, Button } from "./styles";

const MoodForm: React.FC<MoodFormProps> = ({ onAddMood }) => {
  const [mood, setMood] = useState<string>("Happy");
  const [notes, setNotes] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMood: Mood = {
      id: Date.now(),
      mood,
      notes,
    };
    onAddMood(newMood);
    setNotes(""); // Reset notes after submission
    setMood("Happy"); // Reset mood to default
  };

  return (
    <FormContainer>
      <h2>Log Your Mood</h2>
      <Form onSubmit={handleSubmit}>
        <Select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Anxious">Anxious</option>
          <option value="Neutral">Neutral</option>
        </Select>
        <TextArea
          rows={4}
          placeholder="Add notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <Button type="submit">Add Mood</Button>
      </Form>
    </FormContainer>
  );
};

export default MoodForm;
