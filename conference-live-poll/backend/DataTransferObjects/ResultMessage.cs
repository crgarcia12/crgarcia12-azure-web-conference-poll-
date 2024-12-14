namespace pollbackend;

public class ResultMessage
{
    public string Question { get; set; }
    public Series[] Series { get; set; }
}

public class Series
{
    public Data[] Data { get; set; }
}

public class Data
{
    public int Id { get; set; }
    public int Value { get; set; }
    public string Label { get; set; }
}