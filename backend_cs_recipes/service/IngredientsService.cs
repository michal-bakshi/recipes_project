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
    public class IngredientsService:IIngredientsService
    {
        private readonly IIngredientsReposetory _ingredientsReposetory;
        public IngredientsService(IIngredientsReposetory ingredientsReposetory)
        {
            _ingredientsReposetory = ingredientsReposetory;
        }

        public Ingredient AddIngredient(Ingredient ingredient)
        {
          return  _ingredientsReposetory.AddIngredient(ingredient);
        }

        public List<Ingredient> GetAllIngredients()
        {
            return _ingredientsReposetory.GetAllIngredients();
        }
    }
}
