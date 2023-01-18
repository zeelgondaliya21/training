using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrudOperations.DataAccessLayer;

namespace CrudOperations.ServiceLayer
{
    public interface CrudService : CrudServiceApp
    {
        public readonly CrudServiceApp _crudServiceApp;
        public CrudService(CrudServiceApp CrudServiceApp)
        {

        }
    }
}
