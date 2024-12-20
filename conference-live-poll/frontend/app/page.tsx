"use client"; // This is a client component 👈🏽

import Image from "next/image";
import styles from "./page.module.css";
import React, { useEffect, useState } from 'react';
import signalRService from './signalr/signalrservice';
import { HubConnectionBuilder, HubConnection, LogLevel } from '@microsoft/signalr';
import { v4 as uuidv4 } from 'uuid';

import Poll from './poll/page'; // Import the Poll component
import Result from './result/page'; // Import the Result component
import Connect from "./connect/page";

export type QuestionMessage = {
  sessionId: string;
  question: string;
  options: string[];
};

export type AnswerMessage = {
  sessionId: string;
  question: string;
  vote: number;
};

export type ConnectMessage = {
  sessionId: string;
  name: string;
};

export type ResultMessage = {
  question: string;
  series: {
    data: {
      id: number;
      value: number;
      label: string;
    }[];
  }[];
};

const defaultQuestion: QuestionMessage = {
  sessionId: '',
  question: 'Waiting for the question...',
  options: []
};

const defaultResult: ResultMessage = {
  question: 'Waiting for the result...',
  series: []
};

export default function Home() {
  const [sessionId, setSessionId] = React.useState<string>(uuidv4());
  
  const [connection, setConnection] = React.useState<HubConnection>();
  const [connectingState, setConnectingState] = React.useState(0); // 0: not connecting, 1: connecting, 2: connected
  const [connectingErrorMessage, setConnectingErrorMessage] = React.useState('');

  const [currentComponent, setCurrentComponent] = React.useState(0); // 0: connecting, 1: question, 2: results
  const [currentQuestion, setCurrentQuestion] = React.useState<QuestionMessage>(defaultQuestion);
  const [currentResult, setCurrentResult] = React.useState<ResultMessage>(defaultResult);
  
  const connect = async (name: string) => {
    if (connectingState === 0) {
      setConnectingState(1);
      setSessionId(uuidv4());
      await createSignalRConnection(sessionId, name);
    }
  };

  const createSignalRConnection = async (sessionId: string, name: string) => {
    try {
      console.log(`[MainPage] Reading environment variables [${process.env.NEXT_PUBLIC_BACKEND_URI}]`);
      var uri = process.env.NEXT_PUBLIC_BACKEND_URI
        ? process.env.NEXT_PUBLIC_BACKEND_URI
        : 'http://localhost:59028';
      
      uri = new URL('articlehub', uri).href;
      console.log(`[MainPage] Connecting to [${uri}]`);

      // initi the connection
      const connection = new HubConnectionBuilder()
        .withUrl(uri, {withCredentials: false})
        .withAutomaticReconnect(Array(3).fill(1000))
        .configureLogging(LogLevel.Information)
        .build();

      //setup handlers
      connection.on('QuestionMessage', (message: QuestionMessage) => {
        console.log(`[MainPage][${message.sessionId}] Received question: ${message.question}`);
        message.sessionId = sessionId;
        setCurrentQuestion(message);
        setCurrentComponent(1);
      });

      connection.on('ResultMessage', (message: ResultMessage) => {
        console.log(`[MainPage] Received result for: ${message.question}`);
        setCurrentResult(message);
        setCurrentComponent(2);
      });

      connection.onclose(async () => {
        console.log(`[MainPage] Connection closed.`);

        try {
          console.log(`[MainPage] Connecting ID: ${connection.connectionId}; Name: ${name}`);
            const connectMessage: ConnectMessage = { sessionId: sessionId, name: name };
            await connection.start();
            await connection.invoke('ConnectToAgent', connectMessage);
          console.log(`[MainPage] Connection re-established.`);
        } catch (error) {
          console.error(error);
          setConnectingErrorMessage('Could not connect to the server. Please try again later.');
          setConnectingState(0);
          setCurrentComponent(0);
        }
      });

      console.log(`[MainPage] Connecting ID: ${connection.connectionId}; Name: ${name}`);     
        const connectMessage: ConnectMessage = { sessionId: sessionId, name: name };
        await connection.start();
        await connection.invoke('ConnectToAgent', connectMessage);
      console.log(`[MainPage] Connection re-established.`);

      setConnection(connection);
      console.log(`[MainPage] Connection established.`);
    } catch (error) {
      console.error(error);
      setConnectingErrorMessage('Could not connect to the server. Please try again later.');
      setConnectingState(0);
    }
  };

  const sendAnswer = async (answerMessage: AnswerMessage) => {
    if (connection) {
      answerMessage.sessionId = sessionId;
      console.log(`[MainPage] Sending answer: ${answerMessage}`);
      await connection.invoke('PushAnswer', answerMessage);
      console.log(`[MainPage] Answer sent`);
    } else {
      console.error(`[MainPage] Connection not established. Answer could not be sent.`);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
      {currentComponent === 0 && (
        <Connect connectingErrorMessage={connectingErrorMessage} connect={connect} connectingState={connectingState} />
      )}
      {currentComponent === 1 && (
        <Poll currentQuestion={currentQuestion} sendAnswer={sendAnswer} />
      )}
      {currentComponent === 2 && (
        <Result currentResult={currentResult} />
      )}
      </main>
    </div>
  );
}
