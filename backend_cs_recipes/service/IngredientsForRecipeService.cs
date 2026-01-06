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
    public class IngredientsForRecipeService:IIngredientsForRecipeService
    {
        public readonly IIngredientsForRecipeReposetory _IngredientsForRecipeRepository;

        public IngredientsForRecipeService(IIngredientsForRecipeReposetory ingredientsForRecipeRepository)
        {
            _IngredientsForRecipeRepository = ingredientsForRecipeRepository;
        }

        public List<IngredientsForRecipe> AddIngredient(int id, Dictionary<int, string> intIngredient)
        {
           return _IngredientsForRecipeRepository.AddIngredient(id, intIngredient);
        }

        public List<IngredientsForRecipe> GetIngredientRecipe(int id)
        {
            return _IngredientsForRecipeRepository.GetIngredientRecipe(id);
        }
    }
}

