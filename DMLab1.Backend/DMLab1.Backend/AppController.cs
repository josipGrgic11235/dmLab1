using System.Web.Http;

namespace DMLab1.Backend
{
    public class AppController: ApiController 
    {
        [Route("api/app/login")]
        [HttpPost]
        public ResponseData Login([FromBody] Login logindata)
        {
            return AppManager.GetData(logindata);
        }

        [Route("api/app/venue/{venueId}")]
        [HttpGet]
        public VenueInfo GetVenueInformation([FromUri] string venueId)
        {
            return AppManager.GetVenueInformation(venueId);
        }
    }
}
