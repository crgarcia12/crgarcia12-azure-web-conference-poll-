"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
import { Container, Typography, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { QuestionMessage } from '../page';

type PollProps = {
  currentQuestion: QuestionMessage;
  sendMessage: (question: QuestionMessage) => void;
};

const Poll = ({currentQuestion, sendMessage}: PollProps ) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [voted, setVoted] = useState(false);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleVote = () => {
    if (selectedOption) {
      setVoted(true);
      // Here you can add the logic to handle the vote, e.g., send it to a server
      console.log(`Voted for: ${selectedOption}`);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {currentQuestion.question}
      </Typography>
      <RadioGroup value={selectedOption} onChange={handleOptionChange}>
        <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
        <FormControlLabel value="option2" control={<Radio />} label={currentQuestion.answer1} />
        <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
      </RadioGroup>
      <Button variant="contained" color="primary" onClick={handleVote} disabled={!selectedOption || voted}>
        {voted ? 'Voted' : 'Vote'}
      </Button>
    </Container>
  );
};

export default Poll;