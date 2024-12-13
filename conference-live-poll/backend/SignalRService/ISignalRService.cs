namespace pollbackend;
public interface ISignalRService
{
    Task SendMessageToSpecificClient(FrontEndMessage fem);
}
