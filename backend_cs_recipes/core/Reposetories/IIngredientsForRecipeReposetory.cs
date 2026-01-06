using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Reposetories
{
    public interface IIngredientsForRecipeReposetory
    {
        List<IngredientsForRecipe> GetIngredientRecipe(int id);
        List<IngredientsForRecipe> AddIngredient(int id, Dictionary<int, string> intIngredient);
    }
}
