import { Component, Input } from '@angular/core';
import { Recipe } from '../../interface/Recipe.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../service/Recipe.service';
import { IngredientsForRecipeService } from '../../service/IngredientsForRecipe.service';
import { IngredientsForRecipe } from '../../interface/IngredientsForRecipe.interface';
import { CommonModule } from '@angular/common';
import { Ingredients } from '../../interface/Ingredients.interface';
import { IngredientsService } from '../../service/Ingredients.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-more-details',
  imports: [CommonModule],
  templateUrl: './more-details.component.html',
  styleUrl: './more-details.component.css'
})
export class MoreDetailsComponent {
  baseUrl:string=`${environment.apiBaseUrl}/Images/`;
  constructor(private router:ActivatedRoute, private recipeService:RecipeService, private ingredientsForResipe:IngredientsForRecipeService,private ingredientService:IngredientsService){}
 codeRecipe:number=0;
currentRecipe:Recipe={
code:0,
name:"",
description:"",
img:"",
difficultyLevel:1,
time:1,
quantity:0,
instructions:"",
codeUser:1};
ingredientsForRecipeList:IngredientsForRecipe[]=[];

allIngredients: Ingredients[] = []; // מכיל את שמות הרכיבים
mergedIngredients: { name: string, amount: string }[] = [];

ngOnInit() {
   this.codeRecipe = Number(this.router.snapshot.paramMap.get('code'));
  this.recipeService.Get(this.codeRecipe).subscribe({
    next: (recipes: Recipe) => {
      this.currentRecipe = recipes;
      console.log(this.currentRecipe);
      this.ingredientsForResipe.get(this.codeRecipe).subscribe({
      next: (ingredientsForRecipe:IngredientsForRecipe[]) => {
        console.log(ingredientsForRecipe);
        this.ingredientsForRecipeList = ingredientsForRecipe;
        this.ingredientService.get().subscribe({
            next: (ingredients: Ingredients[]) => {
              this.allIngredients = ingredients;
              this.mergedIngredients = this.ingredientsForRecipeList.map(ifr => {
                const matched = this.allIngredients.find(i => i.code === ifr.ingredientCode);
                return {
                  name: matched ? matched.name : 'לא נמצא שם רכיב',
                  amount: ifr.amount
                };
              });
            }
          });
      },
      error: (err) => {
        console.error('שגיאה בהבאת מרכיבים למתכון', err);
      }
    })},
    error: (err) => {
      console.error('שגיאת התחברות', err);
    }
  })
}
}
     
         
      