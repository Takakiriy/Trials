using System;
using System.Threading.Tasks;
using job = Microsoft.Azure.WebJobs;  // nuget: Microsoft.Azure.WebJobs
using mvc = Microsoft.AspNetCore.Mvc;  // nuget: Microsoft.AspNetCore.Mvc
using httpx = Microsoft.Azure.WebJobs.Extensions.Http;  // nuget: Microsoft.Azure.WebJobs.Extensions.Http
using http = Microsoft.AspNetCore.Http;
using log = Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;  // nuget: Microsoft.Extensions.DependencyInjection
using send = SendGrid;  // nuget: SendGrid
using mail = SendGrid.Helpers.Mail;
using SendGrid.Extensions.DependencyInjection;

namespace Company.Function
{
    public static class MailSender1
    {
        [job::FunctionName("MailSender1")]
        public static async Task<mvc::IActionResult> Run(
            [job::HttpTrigger(httpx::AuthorizationLevel.Anonymous, "get", "post", Route = null)] http::HttpRequest req,
            log::ILogger log)
        {
            var services = ConfigureServices(new ServiceCollection()).BuildServiceProvider();
            var client = services.GetRequiredService<send::ISendGridClient>();
            var from = new mail::EmailAddress("from@example.com", "Example User");
            var to = new mail::EmailAddress(Environment.GetEnvironmentVariable("SendGrid_SendTo"), "Example User");
            var msg = new mail::SendGridMessage
            {
                From = from,
                Subject = "Sending with Twilio SendGrid is Fun"
            };
            msg.AddContent(send::MimeType.Text, "and easy to do anywhere, even with C#");
            msg.AddTo(to);
            if (Environment.GetEnvironmentVariable("SendGrid_SandboxMode") == "true")
            {
                msg.MailSettings = new mail::MailSettings
                {
                    SandboxMode = new mail::SandboxMode
                    {
                        Enable = true
                    }
                };
            }
            Console.WriteLine($"Sending email with payload: \n{msg.Serialize()}");
            var response = await client.SendEmailAsync(msg).ConfigureAwait(false);

            Console.WriteLine($"Response: {response.StatusCode}");
            Console.WriteLine(response.Headers);
            return new mvc::OkObjectResult($"Sent to {to.Email}");
        }

        private static IServiceCollection ConfigureServices(IServiceCollection services)
        {
            services.AddSendGrid(options => {
                options.ApiKey = Environment.GetEnvironmentVariable("SendGrid_API_Key");
            });
            return services;
        }
    }
}
