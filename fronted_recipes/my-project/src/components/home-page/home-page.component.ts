import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeService } from '@/service/Recipe.service';
import { Recipe } from '@/interface/Recipe.interface';
import { UppercaseRecipePipe } from '@/app/pipes/uppercase-recipe.pipe';
import { environment } from '@/environments/environment';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, UppercaseRecipePipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  baseUrl: string = `${environment.apiBaseUrl}/Images/`;
  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
  ) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  private loadRecipes(): void {
    this.recipeService.GetAll().subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes = recipes;
        console.log('Recipes loaded:', this.recipes);
      },
      error: (err) => {
        console.error('שגיאה בטעינת המתכונים', err);
      }
    });
  }
}
