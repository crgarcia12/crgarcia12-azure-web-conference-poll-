"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

import { ResultMessage } from '../page';

type ResultProps = {
  resultMessage: ResultMessage;
};

const Result = ({resultMessage}: ResultProps ) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [voted, setVoted] = useState(false);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {resultMessage.question}
      </Typography>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'series A' },
              { id: 1, value: 15, label: 'series B' },
              { id: 2, value: 20, label: 'series C' },
            ],
          },
        ]}
        width={400}
        height={200}
      />
    </Container>
  );
};

export default Poll;