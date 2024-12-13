namespace pollbackend;

using Microsoft.AspNetCore.SignalR;

public class ArticleHub : Hub<IArticleHub>
{
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

    }

    // This method is called when a new user connects to the hub.
    public async Task ConnectToAgent(string SessionId)
    {
        var frontEndMessage = new FrontEndMessage()
        {
            sessionId = SessionId,
            question = "Connected to agents",
        };

        SignalRConnectionsDB.ConnectionIdByUser.AddOrUpdate(SessionId, Context.ConnectionId, (key, oldValue) => Context.ConnectionId);
    }
}