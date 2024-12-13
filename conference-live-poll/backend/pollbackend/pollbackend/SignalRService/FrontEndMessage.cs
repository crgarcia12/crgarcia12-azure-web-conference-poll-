namespace Marketing.SignalRHub;

public class FrontEndMessage
{
    public string sessionId { get; set; }
    public string question { get; set; }
    public string answer1 { get; set; }
    public string answer2 { get; set; }
    public int vote { get; set; }
}