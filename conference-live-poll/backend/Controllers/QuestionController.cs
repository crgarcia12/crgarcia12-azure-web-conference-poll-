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
        // Get parameters from querystring

        FrontEndMessage fem = new FrontEndMessage
        {
            question = "asd",
            answer1 = "as1",
            answer2 = "as2",
            sessionId = "sess"
        };
        await _signalRClient.SendMessageToSpecificClient(fem);
        return "Yes!";
    }

    [HttpPut()]
    public async Task Put([FromBody] FrontEndMessage value)
    {
        await _signalRClient.SendMessageToSpecificClient(value);
    }

}
