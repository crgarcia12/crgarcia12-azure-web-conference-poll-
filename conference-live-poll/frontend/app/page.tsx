"use client"; // This is a client component 👈🏽

import Image from "next/image";
import styles from "./page.module.css";
import Poll from './poll/page'; // Import the Poll component

import React, { useEffect, useState } from 'react';
import signalRService from './signalr/signalrservice';
import { HubConnectionBuilder, HubConnection, LogLevel } from '@microsoft/signalr';

import { v4 as uuidv4 } from 'uuid';

export type QuestionMessage = {
  sessionId: string;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
};

export type AnswerMessage = {
  sessionId: string;
  question: string;
  vote: number;
};

const defaultQuestion: QuestionMessage = {
  sessionId: '1234',
  question: 'Waiting for the question...',
  answer1: 'Red',
  answer2: 'Blue',
  answer3: 'Green'
};

export default function Home() {
  const [sessionId] = React.useState<string>(uuidv4());
  const [connection, setConnection] = React.useState<HubConnection>();
  const [currentQuestion, setMessages] = React.useState<QuestionMessage>(defaultQuestion);

  const createSignalRConnection = async (sessionId: string) => {
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

      //setup handler
      connection.on('ReceiveMessage', (message: QuestionMessage) => {
        console.log(`[MainPage][${message.sessionId}] Received question: ${message.question}`);
        message.sessionId = sessionId;
        setMessages(message);
      });

      connection.onclose(async () => {
        console.log(`[MainPage] Connection closed.`);

        try {
          await connection.start();
          console.log(`Connection ID: ${connection.connectionId}`);
          await connection.invoke('ConnectToAgent', sessionId);
          console.log(`[MainPage] Connection re-established.`);
        } catch (error) {
          console.error(error);
        }
      });

      await connection.start();
      console.log(`Connection ID: ${connection.connectionId}`);
      await connection.invoke('ConnectToAgent', sessionId);

      setConnection(connection);
      console.log(`[MainPage] Connection established.`);
    } catch (error) {
      console.error(error);
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
  

  React.useEffect(() => {
    createSignalRConnection(sessionId);
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Poll currentQuestion={currentQuestion} sendAnswer={sendAnswer} />
      </main>
      {/* <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
