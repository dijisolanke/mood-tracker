import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MoodForm from "./components/MoodForm";
import MoodCalendar from "./components/MoodCalendar";
import { Mood } from "./components/MoodForm/types";
import MoodStats from "./components/MoodStats";

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const App: React.FC = () => {
  const [moods, setMoods] = useState<Mood[]>(() => {
    const savedMoods = localStorage.getItem("moods");
    return savedMoods ? JSON.parse(savedMoods) : [];
  });

  useEffect(() => {
    localStorage.setItem("moods", JSON.stringify(moods));
  }, [moods]);

  const handleAddMood = (newMood: Mood) => {
    setMoods((prevMoods) => [...prevMoods, newMood]);
  };

  const handleDeleteMood = (id: number) => {
    setMoods((prevMoods) => prevMoods.filter((mood) => mood.id !== id));
  };

  return (
    <AppContainer>
      <h1>Daily Mood Tracker</h1>
      <MoodForm onAddMood={handleAddMood} />
      <MoodCalendar moods={moods} onDeleteMood={handleDeleteMood} />
      <MoodStats moods={moods} />
    </AppContainer>
  );
};

export default App;
