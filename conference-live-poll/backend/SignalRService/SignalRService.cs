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

    public async Task SendMessageToSpecificClient(QuestionMessage fem)
    {
        await _hubContext.Clients.All.SendAsync("ReceiveMessage", fem);
    }
}
