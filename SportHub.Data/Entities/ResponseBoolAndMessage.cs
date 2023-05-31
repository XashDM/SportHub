namespace SportHub.Data.Entities;

public class ResponseWithBoolAndMessage
{
    public bool IsSuccess { get; set; }
    
    public string ErrorMessage { get; set; }
}