using System;
using System.Collections.Generic;
using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data;

public partial class DataContext : DbContext
{
    public DataContext()
    {
    }

    public DataContext(DbContextOptions<DataContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Ingredient> Ingredients { get; set; }

    public virtual DbSet<IngredientsForRecipe> IngredientsForRecipes { get; set; }

    public virtual DbSet<Recipe> Recipes { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=MyDB");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Ingredient>(entity =>
        {
            entity.HasKey(e => e.Code);

            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<IngredientsForRecipe>(entity =>
        {
            entity.HasKey(e => new { e.RecipeCode, e.IngredientCode });

            entity.ToTable("IngredientsForRecipe");

            entity.Property(e => e.Amount)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Code).ValueGeneratedOnAdd();

            entity.HasOne(d => d.IngredientCodeNavigation).WithMany(p => p.IngredientsForRecipes)
                .HasForeignKey(d => d.IngredientCode)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_IngredientsForRecipe_Ingredients");

            entity.HasOne(d => d.RecipeCodeNavigation).WithMany(p => p.IngredientsForRecipes)
                .HasForeignKey(d => d.RecipeCode)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_IngredientsForRecipe_Recipe");
        });

        modelBuilder.Entity<Recipe>(entity =>
        {
            entity.HasKey(e => e.Code);

            entity.ToTable("Recipe");

            entity.Property(e => e.Description)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Img)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Instructions)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.CodeUserNavigation).WithMany(p => p.Recipes)
                .HasForeignKey(d => d.CodeUser)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Recipe_Users");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(30)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
