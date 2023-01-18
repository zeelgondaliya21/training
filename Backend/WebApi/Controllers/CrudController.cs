using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Net.Http;
using WebApi.Models;

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
            string query = "get_patient_data()";
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
