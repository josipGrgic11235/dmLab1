using System;
using Microsoft.Owin.Hosting;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace DMLab1.Backend
{
    class Program
    {
        static void Main(string[] args)
        {

            /*var client = new MongoClient("mongodb://localhost:27017");
            var db = client.GetDatabase("dmLab1");
            var collection = db.GetCollection<MongoObject>("data");
            collection.DeleteMany(FilterDefinition<MongoObject>.Empty);
            collection.InsertOne(new MongoObject(42, "The Universe"));
            var obj = collection.Find(FilterDefinition<MongoObject>.Empty).Single();*/

            string domainAddress = "http://localhost:3008/";

            AppManager.GetData();

            using (WebApp.Start(url: domainAddress))
            {
                Console.WriteLine("Service Hosted " + domainAddress);
                System.Threading.Thread.Sleep(-1);
            }
        }
    }

    public class MongoObject
    {
        [BsonId]
        public ObjectId Id { get; set; }
        [BsonElement("a")]
        public int A { get; set; }
        [BsonElement("b")]
        public string B { get; set; }

        public MongoObject(int a, string b)
        {
            A = a;
            B = b;
        }
    }
}
