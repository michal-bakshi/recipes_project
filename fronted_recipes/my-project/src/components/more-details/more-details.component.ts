import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { RecipeService } from '@/service/Recipe.service';
import { IngredientsForRecipeService } from '@/service/IngredientsForRecipe.service';
import { IngredientsService } from '@/service/Ingredients.service';
import { Recipe } from '@/interface/Recipe.interface';
import { IngredientsForRecipe } from '@/interface/IngredientsForRecipe.interface';
import { Ingredients } from '@/interface/Ingredients.interface';
import { environment } from '@/environments/environment';

interface MergedIngredient {
  name: string;
  amount: string;
}

@Component({
  selector: 'app-more-details',
  imports: [CommonModule],
  templateUrl: './more-details.component.html',
  styleUrl: './more-details.component.css'
})
export class MoreDetailsComponent implements OnInit {
  baseUrl: string = `${environment.apiBaseUrl}/Images/`;
  recipeCode: number = 0;
  currentRecipe: Recipe = {
    code: 0,
    name: '',
    description: '',
    img: '',
    difficultyLevel: 1,
    time: 1,
    quantity: 0,
    instructions: '',
    codeUser: 1
  };
  mergedIngredients: MergedIngredient[] = [];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private ingredientsForRecipeService: IngredientsForRecipeService,
    private ingredientService: IngredientsService
  ) {}

  ngOnInit(): void {
    this.recipeCode = Number(this.route.snapshot.paramMap.get('code'));
    this.loadRecipeDetails();
  }

  private loadRecipeDetails(): void {
    this.recipeService.Get(this.recipeCode).subscribe({
      next: (recipe: Recipe) => {
        this.currentRecipe = recipe;
        this.loadIngredients();
      },
      error: (err) => {
        console.error('שגיאה בטעינת המתכון', err);
      }
    });
  }

  private loadIngredients(): void {
    forkJoin({
      ingredientsForRecipe: this.ingredientsForRecipeService.get(this.recipeCode),
      allIngredients: this.ingredientService.get()
    }).subscribe({
      next: ({ ingredientsForRecipe, allIngredients }) => {
        this.mergedIngredients = this.mergeIngredients(ingredientsForRecipe, allIngredients);
      },
      error: (err) => {
        console.error('שגיאה בהבאת מרכיבים למתכון', err);
      }
    });
  }

  private mergeIngredients(
    ingredientsForRecipe: IngredientsForRecipe[],
    allIngredients: Ingredients[]
  ): MergedIngredient[] {
    return ingredientsForRecipe.map(ifr => {
      const matched = allIngredients.find(ing => ing.code === ifr.ingredientCode);
      return {
        name: matched ? matched.name : 'לא נמצא שם רכיב',
        amount: ifr.amount || ''
      };
    });
  }
}
