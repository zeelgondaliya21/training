namespace WebApi.Models
{
    public class Patient
    {
        public int Id { get; set; } = default!;
        public string? Firstname { get; set; } = default!;
        public string? Sex { get; set; } = default!;
    }
}
