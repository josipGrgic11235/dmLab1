using System.Web.Http;

namespace DMLab1.Backend
{
    public class AppController: ApiController 
    {
        [Route("api/app/login")]
        [HttpPost]
        public ResponseData Login([FromBody] Login logindata)
        {
            var data = AppManager.GetData(logindata.Location);

            if (data != null)
            {
                MongoDatabase.StoreResponseData(data, logindata);
            }

            return data;
        }

        [Route("api/app/venue/{venueId}")]
        [HttpGet]
        public VenueInfo GetVenueInformation([FromUri] string venueId)
        {
            var venueInfo = AppManager.GetVenueInformation(venueId);

            if (venueInfo != null)
            {
                MongoDatabase.StoreVenueInfo(venueInfo);
            }

            return venueInfo;
        }
    }
}
