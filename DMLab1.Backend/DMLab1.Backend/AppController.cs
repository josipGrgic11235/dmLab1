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
        [HttpPost]
        public object Get([FromBody] Response o)
        {
            Console.WriteLine("GET");
            return new
            {
                Message = "Hello there",
                Data = new
                {
                    AccessToken = "Token",
                    Number = 5
                }
            };
        }

        [Route("api/app/get")]
        [HttpGet]
        public object Get()
        {
            Console.WriteLine("GET");
            return new
            {
                Message = "Hello there",
                Data = new
                {
                    AccessToken = "Token",
                    Number = 5
                }
            };
        }
    }

    public class Response
    {
        public int Obj { get; set; }
    }
}
