namespace pollbackend;

public class QuestionsDB: IQuestionDB
{
    List<ResultMessage> resultMessages = new List<ResultMessage>();

    public void AddVote(string question, string name, int option)
    {
        resultMessages.Last().Series[0].Data[option].Value++;
    }

    public void CreateQuestion(QuestionMessage questionMessage)
    {
        var rm = new ResultMessage()
        {
            Question = questionMessage.question,
            Series = new Series[] { new Series()
                { 
                    Data = new Data[questionMessage.options.Count()]
                }
            }
        };

        int index = 0;
        foreach (var option in questionMessage.options)
        {
            rm.Series[0].Data[index] = new Data()
            {
                Id = index,
                Label = option,
                Value = 0
            };
            index++;
        }

        resultMessages.Add(rm);
    }

    public ResultMessage GetQuestionResults(int index)
    {
        if (index == -1)
        {
            return resultMessages.Last();
        }
        return resultMessages.ElementAt(index);
    }
}
