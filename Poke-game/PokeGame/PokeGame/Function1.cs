using System    ;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Collections.Concurrent;

namespace PokeGame
{
    public static class Function1
    {
        private const int MinTeamIndex = 1;
        private const int MaxTeamIndex = 2;
        private static ConcurrentDictionary<int, int> Points = new ConcurrentDictionary<int, int>();

        [FunctionName("Function1")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string action = req.Query["action"];
            if(string.Compare(action, "getpoints") == 0)
            {
                return GetPoints(req);
            }
            else if(string.Compare(action, "vote") == 0)
            {
                return Vote(req);
            }
            return new BadRequestObjectResult("Expected parameter action with values vote or getpoints");
        }

        private static IActionResult Vote(HttpRequest req)
        {
            int teamIndex;
            if (!Int32.TryParse(req.Query["teamIndex"], out teamIndex) && teamIndex < MinTeamIndex || teamIndex > MaxTeamIndex)
            {
                return new BadRequestObjectResult($"Wrong teamindex, expected an int between {MinTeamIndex} and {MaxTeamIndex}");
            }

            Points.AddOrUpdate(teamIndex, 1, (key, oldValue) => oldValue + 1);
            return (ActionResult)new OkObjectResult(JsonConvert.SerializeObject(Points));
        }

        private static IActionResult GetPoints(HttpRequest req)
        {
            return (ActionResult)new OkObjectResult(JsonConvert.SerializeObject(Points));
        }
    }
}
