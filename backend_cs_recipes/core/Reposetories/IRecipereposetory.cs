using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Reposetories
{
    public interface IRecipereposetory
    {
        public List<Recipe> GetAll();
        public Recipe GetByCode(int Code);
        public Recipe AddRecipe(Recipe recipe);
    }
}
