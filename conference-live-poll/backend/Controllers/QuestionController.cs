namespace pollbackend;

using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class QuestionController : ControllerBase
{

    private readonly ILogger<QuestionController> _logger;
    private readonly ISignalRService _signalRClient;


    public QuestionController(ISignalRService signalRClient)
    {
        //_logger = logger;
        _signalRClient = signalRClient;
    }

    // GET: api/<QuestionController>
    [HttpGet()]
    public async Task<string> Get()
    {
        return "Yes!";
    }

    [HttpPut()]
    public async Task Put([FromBody] QuestionMessage value)
    {
        await _signalRClient.SendMessageToSpecificClient(value);
    }

}
