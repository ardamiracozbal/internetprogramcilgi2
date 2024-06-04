using Microsoft.AspNetCore.Identity;

namespace WebApplication1.Models
{
    public class AppUser : IdentityUser
    {
        public string? FullName { get; set; }
        public string? Addres { get; set; }
    }
}
