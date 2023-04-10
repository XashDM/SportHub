using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportHub.Data.Entities
{
    public class User
    { 
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public bool IsAdmin { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool IsActivated { get; set; }
    }
}

