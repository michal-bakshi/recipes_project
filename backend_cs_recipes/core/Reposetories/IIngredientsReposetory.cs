using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Reposetories
{
    public interface IIngredientsReposetory
    {
        public List<Ingredient> GetAllIngredients();
        public Ingredient AddIngredient(Ingredient ingredient);
    }
}
