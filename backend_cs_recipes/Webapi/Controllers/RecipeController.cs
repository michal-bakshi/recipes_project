using Core.Services;
using Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service;

namespace Webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipeController : Controller
    {
        private readonly IRecipeService _recipeService;

        public RecipeController(IRecipeService recipeService)
        {
            _recipeService = recipeService;
        }
        [HttpGet]
        public ActionResult<List<Recipe>> GetAll()
        {
            var recipes = _recipeService.GetAll();
            return Ok(recipes);
        }
        [HttpGet("{code}")]
        public ActionResult<Recipe> GetByCode(int code)
        {
            var recipe = _recipeService.GetByCode(code);
            if (recipe == null)
                return NotFound();

            return Ok(recipe);
        }

        [HttpPost]
        public ActionResult<Recipe> AddRecipe([FromBody] Recipe recipe)
        {
            return _recipeService.AddRecipe(recipe);
        }
    }
}
