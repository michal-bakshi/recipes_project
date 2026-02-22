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
        private readonly IUserReposetory _userRepository;

        public RecipeService(IRecipereposetory recipe, IUserReposetory userRepository)
        {
            _recipe = recipe;
            _userRepository = userRepository;
        }

        public Recipe AddRecipe(Recipe recipe)
        {
            // Validate that the user exists before adding the recipe
            var user = _userRepository.GetUserById(recipe.CodeUser);
            if (user == null)
            {
                throw new InvalidOperationException($"User with ID {recipe.CodeUser} does not exist. Please ensure you are logged in.");
            }

            return _recipe.AddRecipe(recipe);
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
