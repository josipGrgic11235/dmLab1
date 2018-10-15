using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DMLab1.Backend
{
    public class FoursquareReponse
    {
        public object Meta { get; set; }
        public InnerResponse Response { get; set; }
    }

    public class InnerResponse
    {

        public object SuggestedFilters { get; set; }
        public object Geocode { get; set; }
        public List<GroupInfo> Groups { get; set; }
    }

    public class GroupInfo
    {
        public List<ItemInfo> Items { get; set; }
    }

    public class ItemInfo
    {
        public Venue Venue { get; set; }
    }

    public class Venue
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public Location Location { get; set; }
    }

    public class Location
    {
        public string Address { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}
