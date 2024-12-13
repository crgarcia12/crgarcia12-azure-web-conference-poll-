namespace Marketing.SignalRHub;
public interface ISignalRService
{
    Task SendMessageToSpecificClient(FrontEndMessage fem);
}
