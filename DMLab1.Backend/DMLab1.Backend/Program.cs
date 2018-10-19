using System;
using Microsoft.Owin.Hosting;

namespace DMLab1.Backend
{
    class Program
    {
        static void Main(string[] args)
        {
            string domainAddress = "http://localhost:3008/";

            using (WebApp.Start(url: domainAddress))
            {
                Console.WriteLine("Service Hosted " + domainAddress);
                System.Threading.Thread.Sleep(-1);
            }
        }
    }
}
