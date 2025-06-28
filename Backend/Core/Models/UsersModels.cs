using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FarmSystem.Core.Models
{


public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public string Role { get; set; } = "User";

        public string? ResetToken { get; set; }
        public DateTime? TokenExpiry { get; set; }

        public string OtpCode { get; set; }
        public DateTime? OtpExpiry { get; set; }

    }



    public class AuthResponse
{
    public string Token { get; set; }
    public string Role { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
}

public class LoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
}

public class EmailDto { public string Email { get; set; } }
public class VerifyOtpDto { public string Email { get; set; } public string Otp { get; set; } }
public class ResetPasswordDto { public string Email { get; set; } public string NewPassword { get; set; } }

public class RegisterRequest
{
    public string FullName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Role { get; set; } = "User";
}

}