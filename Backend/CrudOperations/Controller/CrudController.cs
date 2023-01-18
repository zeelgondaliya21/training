using CrudOperations.ServiceLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudOperations.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrudController : ControllerBase
    {
        public readonly CrudService _crudService;
        public CrudController(CrudService crudService)
        {
            _crudService = crudService;
        }
    }
}
