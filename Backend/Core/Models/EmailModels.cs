using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FarmSystem.Core.Models
{
public class EmailSettings
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string SenderEmail { get; set; }
        public string SenderName { get; set; }
        public bool EnableSSL { get; set; }
    }



    public class EmailTemplate
{
    public int Id { get; set; }
    public string TemplateName { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
}



}