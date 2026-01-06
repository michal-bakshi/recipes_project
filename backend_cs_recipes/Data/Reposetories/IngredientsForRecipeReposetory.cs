using Core.Reposetories;
using Core.Services;
using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Reposetories
{
    public class IngredientsForRecipeReposetory : IIngredientsForRecipeReposetory
    {
        private readonly DataContext _context;
        public IngredientsForRecipeReposetory(DataContext context)
        {
            _context = context;
        }

        public List<IngredientsForRecipe> AddIngredient(int recipeId, Dictionary<int, string> intIngredient)
        {
            var addedIngredients = new List<IngredientsForRecipe>();

            foreach (var item in intIngredient)
            {
                var ingredient = new IngredientsForRecipe
                {
                    IngredientCode = item.Key,
                    RecipeCode = recipeId,
                    Amount = item.Value
                };

                _context.IngredientsForRecipes.Add(ingredient);
                addedIngredients.Add(ingredient);
            }

            _context.SaveChanges();

            return addedIngredients;
        
        }


        public List<IngredientsForRecipe> GetIngredientRecipe(int recipeId)
        {
            return _context.IngredientsForRecipes
                .Where(x => x.RecipeCode == recipeId)
                .ToList();
        }
    }
}
