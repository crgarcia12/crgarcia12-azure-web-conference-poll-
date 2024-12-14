namespace pollbackend;
public interface ISignalRService
{
    Task SendMessageToSpecificClient(QuestionMessage fem);
}
