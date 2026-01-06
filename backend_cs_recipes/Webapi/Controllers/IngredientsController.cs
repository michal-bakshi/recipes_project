using Core.Services;
using Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service;

namespace Webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IngredientsController : Controller
    {
        private readonly IIngredientsService _ingredientsService;
        public IngredientsController(IIngredientsService ingredientsService)
        {
            _ingredientsService = ingredientsService;
        }
        [HttpGet]
        public ActionResult<List<Ingredient>> Get()
        {
            return _ingredientsService.GetAllIngredients();
        }

        [HttpPost]
        public ActionResult<Ingredient> Post([FromBody] Ingredient ingredient)
        {
            return _ingredientsService.AddIngredient(ingredient);
        }


    }
}
