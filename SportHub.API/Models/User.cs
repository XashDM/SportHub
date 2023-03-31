using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportHub.Models
{
    public class User
    {
        // [Column("user_id")]
        public string UserId { get; set; } 
        
        // [Column("first_name")]
        public string FirstName { get; set; } 
        
        // [Column("second_name")]
        public string SecondName { get; set; } 
        
        // [Column("isAdmin")]
        public bool IsAdmin { get; set; } 
        
        // [Column("password")]
        public string Password { get; set; } 
        
        public string Email { get; set; }
    }
}

