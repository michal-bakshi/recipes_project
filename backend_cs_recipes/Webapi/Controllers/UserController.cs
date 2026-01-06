using Core.Services;
using Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
            private readonly IUserService _userService;

            public UserController(IUserService userService)
            {
                _userService = userService;
            }

        [HttpGet]
        public ActionResult<User> Get([FromQuery] string email, [FromQuery] string password)
        {
            return _userService.GetUserBy(email, password);
        }

        [HttpPost]
            public ActionResult<User> Post([FromBody] User user)
            {
                _userService.AddUser(user);
            
                return (user);
            
            }

           
       
        
    }
}
