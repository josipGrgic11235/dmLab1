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
        [Route("api/app/login")]
        [HttpPost]
        public object Login([FromBody] Login logindata)
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

    public class Login
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string AccessToken { get; set; }
        public string Id { get; set; }
    }
}
