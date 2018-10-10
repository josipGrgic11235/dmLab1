using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace DMLab1.Backend
{
    public class AppController: ApiController 
    {
        [Route("api/app/get")]
        [HttpGet]
        public void Get()
        {
            Console.WriteLine("GET");
        }
    }
}
