namespace pollbackend;

public interface IQuestionDB
{
    public void CreateQuestion(QuestionMessage questionMessage);
    public ResultMessage GetQuestionResults(int index);
    public void AddVote(string question, string name, int option);
}
