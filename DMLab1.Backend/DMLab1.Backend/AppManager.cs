using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace DMLab1.Backend
{
    public static class AppManager
    {
        // Read From File
        public static readonly string FOURSQUARE_CLIENT_ID = "";
        public static readonly string FOURSQUARE_CLIENT_SECRET = "";

        static AppManager()
        {

        }

        public static void GetData()
        {
            try
            {
                var request = WebRequest.CreateHttp($"https://api.foursquare.com/v2/venues/explore?near=Zagreb&client_id={FOURSQUARE_CLIENT_ID}&client_secret={FOURSQUARE_CLIENT_SECRET}&v=20181015");
                using (var response = request.GetResponse())
                {
                    using (var responseStream = response.GetResponseStream())
                    using (var reader = new StreamReader(responseStream))
                    {
                        var content = reader.ReadToEnd();
                        var data = Newtonsoft.Json.JsonConvert.DeserializeObject<FoursquareReponse>(content);
                        var venues = data.Response.Groups.First().Items.Select(item => item.Venue).ToList();
                    }
                }
            }

            catch (Exception e)
            {

            }
        }
    }
}
