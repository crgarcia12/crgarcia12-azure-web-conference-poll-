namespace pollbackend;
public interface ISignalRService
{
    Task SendQuestionMessageToAllClients(QuestionMessage fem);
    Task SendResultMessageToAllClients(ResultMessage fem);
}
