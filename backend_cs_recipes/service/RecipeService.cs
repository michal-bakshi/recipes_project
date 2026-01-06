using Core.Reposetories;
using Core.Services;
using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class RecipeService:IRecipeService
    {
        private readonly IRecipereposetory _recipe;

        public RecipeService(IRecipereposetory recipe)
        {
            _recipe = recipe;
        }

        public Recipe AddRecipe(Recipe recipe)
        {
          return  _recipe.AddRecipe(recipe);
        }

        public List<Recipe> GetAll()
        {
            return _recipe.GetAll();
        }

        public Recipe GetByCode(int Code)
        {
            return _recipe.GetByCode(Code); 
        }
    }
}
