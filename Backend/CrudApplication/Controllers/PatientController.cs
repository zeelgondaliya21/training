using CrudApplication.Model;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;
using System.Diagnostics.CodeAnalysis;
using System.Transactions;

namespace CrudApplication.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class PatientController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public PatientController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        /// <summary>
        /// Get method to provide patient's data 
        /// </summary>
        /// <param name="patient">empty or anyone from following</param>
        /// <returns>
        /// [
        ///{
        ///"patient_id": 1,
        ///"firstname": "zeel",
        ///"lastname": "gondaliya",
        ///"middlename": "b",
        ///"sex": "Male",
        ///"chart_number": "CHART1",
        ///"dob": "2001-10-02",
        ///}
        ///]
        /// </returns>
        // GET: api/Patients
        [Route("search")]
        [HttpPost]
        public JsonResult GetPatient(PatientSearch patient)
        {
            string query = $@"select * from patientget(f_patient_id => {(patient.patient_id == 0 ? "null" : patient.patient_id)}, 
                                                       f_firstname => {(patient.firstname == null ? "null" : $"'{patient.firstname}'")},
                                                       f_middlename => {(patient.middlename == null ? "null" : $"'{patient.middlename}'")},
                                                       f_lastname => {(patient.lastname == null ? "null" : $"'{patient.lastname}'")},                                          
                                                       f_dob => {(patient.dob == null ? "null" : $"'{patient.dob}'")}, 
                                                       f_sex => {(patient.sex == null ? "null" : $"'{patient.sex}'")}, 
                                                       page => {(patient.PageNumber == 0 ? "null" : patient.PageNumber)}, 
                                                       size => {(patient.PageSize == 0 ? "null" : patient.PageSize)})";
            Console.WriteLine(query);
            DataTable table = new DataTable();
            string? postgresqlDataSource = _configuration.GetConnectionString("myConnectionString");
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
        /// <summary>
        /// Get method to provide patient's data by given id
        /// </summary>
        /// <param name="id">1</param>
        /// <returns>
        /// [
        ///{
        ///"patient_id": 1,
        ///"firstname": "zeel",
        ///"lastname": "gondaliya",
        ///"middlename": "b",
        ///"sex": "Male",
        ///"chart_number": "CHART1",
        ///"dob": "2001-10-02",
        ///}
        ///]
        /// </returns>
        // GET: api/Patients
        [HttpGet("{id}")]
        public JsonResult GetPatientById(int id)
        {
            string query = $"select * from patientget(f_patient_id=>{id})";
            DataTable table = new DataTable();
            string? postgresqlDataSource = _configuration.GetConnectionString("myConnectionString");

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
        /// <summary>
        /// Post method to create new patient and enter data for that patient 
        /// </summary>
        /// <param name="patient"></param>
        /// <returns>
        /// [
        ///{
        ///"firstname": "zeel",
        ///"lastname": "gondaliya",
        ///"middlename": "b",
        ///"dob": "2001-10-02",
        ///}
        ///]
        /// </returns>
        // POST: api/Patients
        [HttpPost]
        public JsonResult PatientCreate(Patient patient)
        {
            string query = $"select patientcreate(f_firstname => '{patient.firstname}',f_lastname => '{patient.lastname}', f_middlename => '{patient.middlename}',f_dob => '{patient.dob}',f_sex=>'{patient.sex}')";
            DataTable table = new DataTable();
            string? postgresqlDataSource = _configuration.GetConnectionString("myConnectionString");
            NpgsqlDataReader myReader;
            Console.WriteLine(query);
            using (NpgsqlConnection mycon = new NpgsqlConnection(postgresqlDataSource))
            {
                mycon.Open();
                using (TransactionScope transactionScope = new TransactionScope())
                {
                    NpgsqlCommand myCommand = new NpgsqlCommand(query, mycon);
                    try
                    {
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        transactionScope.Complete();
                    }
                    catch(Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        transactionScope.Dispose();
                    }
                    finally
                    {
                        mycon.Close();
                    }
                }
            }

            return new JsonResult(table);

        }
        /// <summary>
        /// Put method to update already entered data of patient by id
        /// </summary>
        /// <param name="patient" name="id">1</param>
        /// <returns>
        /// [
        ///{
        ///"firstname": "zeel",
        ///"lastname": "gondaliya",
        ///"middlename": "b",
        ///"sex": "Male",
        ///"dob": "2001-10-02",
        ///}
        ///]
        /// </returns>
        // PUT: api/Patients
        [HttpPut("{id}")]
        public JsonResult PatientUpdate(int id,Patient patient)
        {

           string? query = $"select patientupdate(f_patient_id => {id},f_firstname => '{patient.firstname}', f_lastname => '{patient.lastname}',f_sex=>'{patient.sex}', f_middlename => '{patient.middlename}',f_dob => '{patient.dob}');";
           /* string query = $@"select * from patientput( 
                                                       f_firstname => {(patient.firstname == null ? "null" : $"'{patient.firstname}'")},
                                                       f_lastname => {(patient.lastname == null ? "null" : $"'{patient.lastname}'")},  
                                                       f_sex => {(patient.sex == null ? "null" : $"'{patient.sex}'")},
                                                       f_middlename => {(patient.middlename == null ? "null" : $"'{patient.middlename}'")},
                                                       f_dob => {(patient.dob == null ? "null" : $"'{patient.dob}'")})";
           */
            DataTable table = new DataTable();
            string? postgresqlDataSource = _configuration.GetConnectionString("myConnectionString");

            NpgsqlDataReader myReader;

            using (NpgsqlConnection mycon = new NpgsqlConnection(postgresqlDataSource))
            {
                mycon.Open();
                using (TransactionScope transactionScope = new TransactionScope())
                {
                    NpgsqlCommand myCommand = new NpgsqlCommand(query, mycon);
                    try
                    {
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        transactionScope.Complete();
                    }
                    catch(Exception ex )
                    {
                        Console.WriteLine(ex.Message);
                        transactionScope.Dispose();
                    }
                    finally
                    {
                        mycon.Close();
                    }
                }

            }

            return new JsonResult(table);
        }
        /// <summary>
        /// delete method to delete patient data by id 
        /// </summary>
        /// <param name="id">1</param>
        /// <returns>
        /// [
        ///{
        ///"patient_id": 1,
        ///}
        ///]
        /// </returns>
        // Delete: api/Patients
        [HttpDelete("{id}")]
        public JsonResult DeletePatient(int id)
        {

            string query = $"select patientdelete(f_patient_id=>{id})";

            DataTable table = new DataTable();
            string? postgresqlDataSource = _configuration.GetConnectionString("myConnectionString");

            NpgsqlDataReader myReader;
            using (NpgsqlConnection mycon = new NpgsqlConnection(postgresqlDataSource))
            {
                mycon.Open();
                using (TransactionScope transactionScope = new TransactionScope())
                {
                    NpgsqlCommand myCommand = new NpgsqlCommand(query, mycon);
                    try
                    {
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        transactionScope.Complete();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        transactionScope.Dispose();
                    }
                    finally
                    {
                        mycon.Close();
                    }
                }

            }
            return new JsonResult(table);
        }
    }
}
