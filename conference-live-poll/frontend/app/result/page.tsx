"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

import { ResultMessage } from '../page';

type ResultProps = {
  currentResult: ResultMessage;
};

const Result = ({currentResult}: ResultProps ) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [voted, setVoted] = useState(false);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {currentResult.question}
      </Typography>
      <PieChart
        series={currentResult.series}
        width={400}
        height={200}
      />
    </Container>
  );
};

export default Result;