namespace CrudApplication.Model
{
    public class Patient
    {
        public int? patient_id { get; set; } = default!;
        public string? firstname { get; set; } = null;
        public string? lastname { get; set; } = null;
        public string? middlename { get; set; } = null;
        public string? sex { get; set; } = null;
        public string? dob { get; set; } = null;
        public int? gender_id { get; set; } = default!;

    }
    public class PatientSearch
    {
        public int patient_id { get; set; }
        public string? firstname { get; set; } = null;
        public string? lastname { get; set; } = null;
        public string? middlename { get; set; } = null;
        public string? sex { get; set; } = null;
        public string? dob { get; set; } = null;
        public int? PageNumber { get; set; } = 1;
        public int? PageSize { get; set; } = 5;
    }
}
