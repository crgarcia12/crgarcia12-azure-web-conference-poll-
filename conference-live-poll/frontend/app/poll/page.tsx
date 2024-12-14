"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
import { Container, Typography, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { AnswerMessage, QuestionMessage } from '../page';

type PollProps = {
  currentQuestion: QuestionMessage;
  sendAnswer: (answer: AnswerMessage) => void;
};

const Poll = ({currentQuestion, sendAnswer}: PollProps ) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [voted, setVoted] = useState(false);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleVote = () => {
    if (selectedOption) {
      setVoted(true);
      // Here you can add the logic to handle the vote, e.g., send it to a server
      sendAnswer({ 
        sessionId: currentQuestion.sessionId, 
        question: currentQuestion.question, 
        vote: parseInt(selectedOption.replace('option', '')) 
      });
      console.log(`[Poll] Voted for: ${selectedOption}`);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {currentQuestion.question}
      </Typography>
      <RadioGroup value={selectedOption} onChange={handleOptionChange}>
        {currentQuestion.options.map((option, index) => (
          <FormControlLabel 
            key={index} 
            value={`option${index + 1}`} 
            control={<Radio />} 
            label={option} 
          />
        ))}
      </RadioGroup>
      <Button variant="contained" color="primary" onClick={handleVote} disabled={!selectedOption || voted}>
        {voted ? 'Voted' : 'Vote'}
      </Button>
    </Container>
  );
};

export default Poll;