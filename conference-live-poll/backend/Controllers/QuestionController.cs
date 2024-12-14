namespace pollbackend;

using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class QuestionController : ControllerBase
{

    private readonly ILogger<QuestionController> _logger;
    private readonly ISignalRService _signalRClient;
    private readonly IQuestionDB _questionDb;

    public QuestionController(ISignalRService signalRClient, IQuestionDB questionDb)
    {
        //_logger = logger;
        _signalRClient = signalRClient;
        _questionDb = questionDb;
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
        _questionDb.CreateQuestion(value);
        await _signalRClient.SendQuestionMessageToAllClients(value);
    }

    [HttpPost()]
    public async Task Post([FromBody] bool ShowResult)
    {
        if(ShowResult)
        {
            await _signalRClient.SendResultMessageToAllClients(_questionDb.GetQuestionResults(-1));
        }
    }
}
