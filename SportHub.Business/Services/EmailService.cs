using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;

namespace SportHub.Business.Implementations
{
    public class EmailService: IEmailService
    {
        private readonly string _senderEmail;
        private readonly string _senderPassword;

        public EmailService(IConfiguration config)
        {
            _senderEmail = config.GetSection("EmailSettings")["SenderEmail"];
            _senderPassword = config.GetSection("EmailSettings")["SenderPassword"];
        }
        
        public async Task SendActivationEmailAsync(string userEmail, string activationLink)
        {
            var smtpClient = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                Credentials = new NetworkCredential(_senderEmail, _senderPassword)
            };

            var message = new MailMessage(_senderEmail, userEmail)
            {
                Subject = "Activate your account",
                Body = $"Click this link to activate your account: {activationLink}"
            };
            
            await smtpClient.SendMailAsync(message);
        }
    }
}

