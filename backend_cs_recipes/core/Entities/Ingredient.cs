using System;
using System.Collections.Generic;

namespace Data.Entities;

public partial class Ingredient
{
    public int Code { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<IngredientsForRecipe> IngredientsForRecipes { get; set; } = new List<IngredientsForRecipe>();
}
