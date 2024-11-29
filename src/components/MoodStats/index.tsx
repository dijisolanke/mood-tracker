// src/components/MoodStats/index.tsx

import React from "react";
import { MoodStatsProps } from "./types";
import { StatsContainer, StatItem } from "./styles";

const MoodStats: React.FC<MoodStatsProps> = ({ moods }) => {
  const totalMoods = moods.length;

  const moodCounts = moods.reduce((acc, mood) => {
    acc[mood.mood] = (acc[mood.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostCommonMood = Object.entries(moodCounts).reduce(
    (prev, curr) => (curr[1] > prev[1] ? curr : prev),
    ["", 0]
  );

  return (
    <StatsContainer>
      <h2>Mood Statistics</h2>
      <StatItem>Total Entries: {totalMoods}</StatItem>
      <StatItem>
        Most Common Mood: {mostCommonMood[0]} ({mostCommonMood[1]} times)
      </StatItem>
    </StatsContainer>
  );
};

export default MoodStats;
