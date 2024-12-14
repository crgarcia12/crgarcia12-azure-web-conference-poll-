namespace pollbackend;

public interface IQuestionsHub
{
    public Task ConnectToAgent(string SessionId);

    public Task ChatMessage(QuestionMessage frontEndMessage);

    public Task SendMessageToSpecificClient(string SessionId, string message);
}
