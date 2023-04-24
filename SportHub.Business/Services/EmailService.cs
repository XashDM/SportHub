using System.Net;
using System.Net.Mail;
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
            var message = new MailMessage(_senderEmail, userEmail)
            {
                Subject = "Activate your account",
                IsBodyHtml = true,
                Body = 
                    @"<body classname=""body-dark"" style=""margin: 0; padding: 0; box-sizing: border-box; background: #F9F9FB; font-family: 'Open Sans', sans-serif;""> 
                        <div style=""width: 100%; height: 100%; text-align: center;""> 
                        
                            <h2 style=""font-size: 1.7vw; font-weight: 500;"">Hello! You have successfully registered to Sports Hub</h2>
                            <h2 style=""margin-bottom: 5vh; font-size: 1.7vw; font-weight: 500;"">" + DateTime.Now.ToString("MMMM d, yyyy") + @"</h2>
                
                            <div style='margin: 0 auto; width: 50vw; background: white; padding: 10vh 0; text-align: center;
                            justify-content: center; align-items: center; flex-direction: column; margin-bottom: 20vh;'>
                                <h2 style=""color: #D72331;"">Sports Hub</h2>
                                <p style='margin-bottom: 5vh;'><small style="" color: #213A5B;"">Now you will receive the latest news in the world of sport</small></p>
                                <a style=""all: unset; text-decoration: none; background: #D72331; padding: 2vh 8vw; color: white;"" href='" + activationLink + "'" + @"target=""_blank"">GO TO THE WEBSITE</a>
                            </div>
                        </div>
                    </body>"
            };
            
            
            await _smtpClient.SendMailAsync(message);
        }

        public async Task SendPasswordResetLinkAsync(string userEmail, string resetLink)
        {
            var message = new MailMessage(_senderEmail, userEmail)
            {
                Subject = "Reset your password",
                IsBodyHtml = true,
                Body = 
                    @"<body classname=""body-dark"" style=""margin: 0; padding: 0; box-sizing: border-box; background: #F9F9FB; font-family: 'Open Sans', sans-serif;""> 
                        <div style=""width: 100%; height: 100%; text-align: center; padding: 10vh;""> 
                        
                            <h2 style=""font-size: 1.7vw; font-weight: 500; line-height: normal;"">You have requested to reset your password</h2>
                            <h2 style=""margin-bottom: 5vh; font-size: 1.7vw; font-weight: 500;"">" + DateTime.Now.ToString("MMMM d, yyyy") + @"</h2>
                
                            <div style='margin: 0 auto; width: 50vw; background: white; padding: 3vh 0; text-align: center;
                            justify-content: center; align-items: center; flex-direction: column; margin-bottom: 10vh;'>
                                <p style='margin-bottom: 5vh;'><small style='font-size: 1vw;' color: #213A5B;"">To reset your password, click the following link and follow the instructions.</small></p>
                                <a style=""all: unset; text-decoration: none; background: #D72331; padding: 2vh 10vw; color: white;"" href='" + resetLink + "'" + @"target=""_blank"">RESET PASSWORD</a>
                                <h2 style=""margin-bottom: 2vh; margin-top: 5vh; font-size: 1.3vw;"">Why do I have to reset my password?</h2>
                                <div style='width: 35vw; margin: 0 auto;'>
                                    <p style='margin-bottom: 2vh;'><small style="" color: #213A5B; font-size: 1vw;"">As a security best practice, Sports Hub does not store your password. As such, we cannot simply send you your old password. A unique link to reset your password has been generated for you.</small></p>
                                    <p style=''><small style="" color: #213A5B; font-size: 1vw;"">Please ignore this message if you haven't requested dropping password.</small></p>
                                </div>
                            </div>
                            <h2 style=""color: #D72331; font-weight:500;"">Sports Hub</h2>
                        </div>
                    </body>"
            };
            
            await _smtpClient.SendMailAsync(message);
        }
        
    }
}

