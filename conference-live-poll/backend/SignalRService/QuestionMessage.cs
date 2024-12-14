namespace pollbackend;

public class QuestionMessage
{
    public string sessionId { get; set; }
    public string question { get; set; }
    public string[] options { get; set; }

}