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
            return AppManager.GetData(logindata.Location);
        }

        [Route("api/app/venue/{venueId}")]
        [HttpGet]
        public object GetVenueInformation([FromUri] string venueId)
        {
            return AppManager.GetVenueInformation(venueId);
        }
    }

    public class Login
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string AccessToken { get; set; }
        public string Id { get; set; }
        public string Location { get; set; }
    }
}
