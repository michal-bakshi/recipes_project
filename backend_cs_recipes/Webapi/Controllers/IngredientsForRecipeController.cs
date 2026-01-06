using Core.Services;
using Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IngredientsForRecipeController : Controller
    {
        private readonly IIngredientsForRecipeService _ingredientsForRecipe;
        public IngredientsForRecipeController(IIngredientsForRecipeService ingredientsForRecipe)
        {
            _ingredientsForRecipe = ingredientsForRecipe;
        }
        [HttpPost("{id}")]
        public ActionResult<List<IngredientsForRecipe>> Post(
            int id,
            [FromBody] Dictionary<int, string> intIngredient
        )
        {
            var added = _ingredientsForRecipe.AddIngredient(id, intIngredient);
            return Ok(added);
        }
        [HttpGet("{id}")]
        public ActionResult<List<IngredientsForRecipe>> Get(int id)
        {
            return _ingredientsForRecipe.GetIngredientRecipe(id);
        }

    }
}
