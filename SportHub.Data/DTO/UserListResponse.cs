namespace SportHub.Data.DTO
{
    public class UserListResponse
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public bool IsAdmin { get; set; }

        public bool IsActivated { get; set; }
    }
}
