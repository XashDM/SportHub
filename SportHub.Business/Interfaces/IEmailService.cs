namespace SportHub.Business
{
    public interface IEmailService
    {
        Task SendActivationEmailAsync(string userEmail, string activationLink);
    }
}

