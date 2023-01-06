using WebApi.Models;
namespace WebApi.Data
{
    public class DatabaseStart
    {
        public static void Initialize(PatientContext context)
        {
            context.Database.EnsureCreated();

            if (context.Patient.Any())
            {
                return; 
            }

            var t = new Patient[]{
                new Patient{Id=1, Firstname="a", Sex="Male" },
                new Patient{Id=2, Firstname="b", Sex="Female"},
                new Patient{Id=3, Firstname="c", Sex="Male"},
                new Patient{Id=4, Firstname="d", Sex="Female"},
                new Patient{Id=5, Firstname="e", Sex="Male"},
            };
            foreach (Patient temp in t)
            {
                context.Patient.Add(temp);
            }
            context.SaveChanges();
        }
    }
}
