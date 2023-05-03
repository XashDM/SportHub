using System.Net;
using System.Net.Mail;
using System.Reflection;
using Microsoft.Extensions.Configuration;

namespace SportHub.Business.Implementations
{
    public class EmailService: IEmailService
    {
        private readonly string _senderEmail;
        private readonly string _senderPassword;
        private readonly SmtpClient _smtpClient;
        public EmailService(IConfiguration config)
        {
            _senderEmail = config.GetSection("EmailSettings")["SenderEmail"];
            _senderPassword = config.GetSection("EmailSettings")["SenderPassword"];
            _smtpClient = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                Credentials = new NetworkCredential(_senderEmail, _senderPassword)
            };
        }
        
        public async Task SendActivationEmailAsync(string userEmail, string activationLink)
        {
            var htmlResourceName = "SportHub.Business.Services.Emails.account-activation-email.html";

            var emailHtml = GetEmailHtml(htmlResourceName, activationLink);

            var message = new MailMessage(_senderEmail, userEmail)
            {
                Subject = "Activate your account",
                IsBodyHtml = true,
                Body = emailHtml
            };
            
            
            await _smtpClient.SendMailAsync(message);
        }

        public async Task SendPasswordResetLinkAsync(string userEmail, string resetLink)
        {
            var htmlResourceName = "SportHub.Business.Services.Emails.password-reset-email.html";
            
            var emailHtml = GetEmailHtml(htmlResourceName, resetLink);

            var message = new MailMessage(_senderEmail, userEmail)
            {
                Subject = "Reset your password",
                IsBodyHtml = true,
                Body = emailHtml
            };
            
            await _smtpClient.SendMailAsync(message);
        }

        private string GetEmailHtml(string resourceName, string link)
        {
            using var stream = Assembly.GetExecutingAssembly().GetManifestResourceStream(resourceName);
            using var reader = new StreamReader(stream);
            var htmlContent = reader.ReadToEnd();
            
            htmlContent = htmlContent.Replace("{Link}", link);
            
            var time = DateTime.Now.ToString("MMMM d, yyyy");
            htmlContent = htmlContent.Replace("{DateTime}", time);

            return htmlContent;
        }
    }
}