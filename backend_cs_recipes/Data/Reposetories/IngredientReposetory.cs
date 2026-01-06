using Core.Reposetories;
using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Reposetories
{
    public class IngredientReposetory:IIngredientsReposetory
    {
        private readonly DataContext _context;
        public IngredientReposetory(DataContext context)
        {
            _context = context;
        }

        public Ingredient AddIngredient(Ingredient ingredient)
        {
            _context.Ingredients.Add(ingredient);
            _context.SaveChanges();
            return ingredient;
        }

        public List<Ingredient> GetAllIngredients()
        {
            return _context.Ingredients.ToList();
        }
    }
}
