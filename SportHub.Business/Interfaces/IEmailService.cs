namespace SportHub.Business
{
    public interface IEmailService
    {
        Task SendActivationEmailAsync(string userEmail, string activationLink);
        Task SendPasswordResetLinkAsync(string userEmail, string resetLink);
    }
}

