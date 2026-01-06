using Core.Reposetories;
using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Reposetories
{
    public class RecipeReposetory : IRecipereposetory
    {
        private readonly DataContext _context;
        public RecipeReposetory(DataContext context)
        {
            _context = context;
        }
        public Recipe AddRecipe(Recipe recipe)
        {
            _context.Recipes.Add(recipe);
            _context.SaveChanges();
            return recipe;
        }

        public List<Recipe> GetAll()
        {
            return _context.Recipes.ToList();
        }

        public Recipe GetByCode(int Code)
        {
            return _context.Recipes.FirstOrDefault(x => x.Code == Code);
        }
    }
}
