using System;
using System.Collections.Generic;

namespace Data.Entities;

public partial class Recipe
{
    public int Code { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? Img { get; set; }

    public int? DifficultyLevel { get; set; }

    public int? Time { get; set; }

    public int? Quantity { get; set; }

    public string? Instructions { get; set; }

    public int CodeUser { get; set; }

    public virtual User? CodeUserNavigation { get; set; }

    public virtual ICollection<IngredientsForRecipe> IngredientsForRecipes { get; set; } = new List<IngredientsForRecipe>();
}
