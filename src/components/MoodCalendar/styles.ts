import styled from 'styled-components';

export const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

export const DayCell = styled.div<{ moodColor: string }>`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: ${({ moodColor }) => moodColor || '#f9f9f9'};
  text-align: center;
  position: relative;
  cursor: pointer;
  
  &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
    &:hover button {
      cursor: pointer;
  } 
`;

export const MoodIndicator = styled.div`
  font-size: 24px; /* Adjust later */
`;
