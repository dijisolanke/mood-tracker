import React, { useState } from "react";
import styled from "styled-components";
import MoodForm from "./components/MoodForm";
import MoodCalendar from "./components/MoodCalendar";
import { Mood } from "./components/MoodForm/types";

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const App: React.FC = () => {
  const [moods, setMoods] = useState<Mood[]>([]);

  const handleAddMood = (newMood: Mood) => {
    setMoods((prevMoods) => [...prevMoods, newMood]);
    console.log("Moods:", [...moods, newMood]); // For debugging
  };

  return (
    <AppContainer>
      <h1>Daily Mood Tracker</h1>
      <MoodForm onAddMood={handleAddMood} />
      <MoodCalendar moods={moods} />
      {/* Other components like MoodStats will go here */}
    </AppContainer>
  );
};

export default App;
