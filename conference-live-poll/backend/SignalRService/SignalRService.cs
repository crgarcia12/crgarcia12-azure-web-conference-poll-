using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace pollbackend;

public class SignalRService : ISignalRService
{
    private readonly IHubContext<ArticleHub> _hubContext;
    public SignalRService(IHubContext<ArticleHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task SendMessageToSpecificClient(FrontEndMessage fem)
    {
        await _hubContext.Clients.All.SendAsync("ReceiveMessage", fem);
    }
}
