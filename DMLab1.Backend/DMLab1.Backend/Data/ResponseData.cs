using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DMLab1.Backend
{
    public class ResponseData
    {
        public List<RecommendedVenue> Venues { get; set; }
        public WeatherResponse Weather { get; set; }
    }
}
