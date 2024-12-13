using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace Marketing.SignalRHub;

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
        //await _hubContext.Clients.Client(connectionId).SendAsync("ReceiveMessage", frontEndMessage);
    }
}
