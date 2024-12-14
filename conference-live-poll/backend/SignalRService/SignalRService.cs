using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace pollbackend;

public class SignalRService : ISignalRService
{
    private readonly IHubContext<QuestionsHub> _hubContext;
    public SignalRService(IHubContext<QuestionsHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task SendQuestionMessageToAllClients(QuestionMessage qm)
    {
        await _hubContext.Clients.All.SendAsync("QuestionMessage", qm);
    }

    public async Task SendResultMessageToAllClients(ResultMessage rm)
    {
        await _hubContext.Clients.All.SendAsync("ResultMessage", rm);
    }
}
