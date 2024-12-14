namespace pollbackend;

using Microsoft.AspNetCore.SignalR;

public class QuestionsHub : Hub<IQuestionsHub>
{
    IQuestionDB _questionDB;

    public QuestionsHub(IQuestionDB questionDB)
    {
        _questionDB = questionDB;
    }

    public override async Task OnConnectedAsync()
    {
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        string removedSessionId;
        SignalRConnectionsDB.ConnectionIdByUser.TryRemove(Context.ConnectionId, out _);
        await base.OnDisconnectedAsync(exception);
    }

    public async Task PushAnswer(AnswerMessage answerMessage)
    {
        Console.WriteLine($"Received Answer: {answerMessage.vote} - {answerMessage.ToString()}");
        _questionDB.AddVote(answerMessage.question, answerMessage.sessionId, answerMessage.vote - 1);
    }

    // This method is called when a new user connects to the hub.
    public async Task ConnectToAgent(ConnectMessage connectMessage)
    {
        SignalRConnectionsDB.ConnectionIdByUser.AddOrUpdate(connectMessage.sessionId, Context.ConnectionId, (key, oldValue) => Context.ConnectionId);
    }
}