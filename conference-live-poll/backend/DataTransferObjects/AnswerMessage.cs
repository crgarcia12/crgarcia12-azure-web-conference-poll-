﻿namespace pollbackend;

public class AnswerMessage
{
    public string sessionId {  get; set; }
    public string question { get; set; }
    public int vote { get; set; }
}
