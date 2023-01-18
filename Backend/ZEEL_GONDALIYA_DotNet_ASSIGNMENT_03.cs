using CrudApplication.Model;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;

namespace WebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class CrudController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CrudController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        // GET: api/Patients
        [HttpGet]
        public JsonResult GetPatient()
        {
            string query = $"select get_patient_data()";
            DataTable table = new DataTable();
            string postgresqlDataSource = _configuration.GetConnectionString("myConnectionString");

            NpgsqlDataReader myReader;

            using (NpgsqlConnection mycon = new NpgsqlConnection(postgresqlDataSource))
            {
                mycon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, mycon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult(table);

        }
        // GET: api/Patients
        [HttpGet("Id")]
        public JsonResult GetPatient(int patient_id)
        {
            string query = $"select get_patient_data(f_patient_id=>{patient_id})";
            DataTable table = new DataTable();
            string postgresqlDataSource = _configuration.GetConnectionString("myConnectionString");

            NpgsqlDataReader myReader;

            using (NpgsqlConnection mycon = new NpgsqlConnection(postgresqlDataSource))
            {
                mycon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, mycon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult(table);

        }

        // POST: api/Patients
        [HttpPost]
        public JsonResult InsertPatient(Patient patient)
        {
            string query = $"call createPatient(p_firstname => '{patient.firstname}', p_lastname => '{patient.lastname}', p_middlename => '{patient.middlename}',p_dob => '{patient.dob}',p_gender_id=>'{patient.gender_id}');";
            DataTable table = new DataTable();
            string postgresqlDataSource = _configuration.GetConnectionString("myConnectionString");
            NpgsqlDataReader myReader;

            using (NpgsqlConnection mycon = new NpgsqlConnection(postgresqlDataSource))
            {
                mycon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, mycon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult(table);

        }

        // PUT: api/Patients
        [HttpPut]
        public JsonResult UpdatePatient(int patient_id, Patient patient)
        {
            if (patient_id != patient.patient_id)
            {
                return new JsonResult("id is required in api and json");
            }

            string query = $"call updatePatient(p_patient_id => {patient.patient_id},p_firstname => '{patient.firstname}', p_lastname => '{patient.lastname}', p_middlename => '{patient.middlename}',p_dob => '{patient.dob}',p_gender_id=>{patient.gender_id});";

            DataTable table = new DataTable();
            string postgresqlDataSource = _configuration.GetConnectionString("myConnectionString");

            NpgsqlDataReader myReader;

            using (NpgsqlConnection mycon = new NpgsqlConnection(postgresqlDataSource))
            {
                mycon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, mycon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult(table);
        }

        // Delete: api/Patients
        [HttpDelete]
        public JsonResult DeletePatient(int patient_id)
        {

            string query = $"call deletePatientData(p_patient_id=>{patient_id})";

            DataTable table = new DataTable();
            string postgresqlDataSource = _configuration.GetConnectionString("myConnectionString");

            NpgsqlDataReader myReader;

            using (NpgsqlConnection mycon = new NpgsqlConnection(postgresqlDataSource))
            {
                mycon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, mycon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult(table);
        }
    }
}
