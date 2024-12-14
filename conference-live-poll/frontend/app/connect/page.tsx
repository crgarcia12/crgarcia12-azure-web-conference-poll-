"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
import { Container, Typography, Button, Input } from '@mui/material';

type ConnectProps = {
  connectingErrorMessage: string;
  connect: (name: string) => void;
  connectingState: number;
};

const Connect = ({connect, connectingErrorMessage, connectingState}: ConnectProps ) => {
  const [name, setName] = useState('');

  const handleConnect = () => {
    if(connectingState === 0) {
      connect(name);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the Poll!
      </Typography>
      <Input
        fullWidth
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Insert Your Name"
      />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleConnect} disabled={connectingState != 0}>
          Connect
        </Button>
      </div>
      {connectingErrorMessage && (
        <Typography variant="body1" style={{ color: 'red', marginTop: '10px' }}>
          {connectingErrorMessage}
        </Typography>
      )}
    </Container>
  );
};

export default Connect;