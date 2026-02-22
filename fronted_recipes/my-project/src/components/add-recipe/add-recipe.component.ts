import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { RecipeService } from '@/service/Recipe.service';
import { UserService } from '@/service/User.service';
import { ImageService } from '@/service/Image.service';
import { IngredientsService } from '@/service/Ingredients.service';
import { IngredientsForRecipeService } from '@/service/IngredientsForRecipe.service';
import { Recipe } from '@/interface/Recipe.interface';
import { Ingredients } from '@/interface/Ingredients.interface';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent implements OnInit {
  name: string = '';
  description: string = '';
  difficultyLevel: number = 1;
  time: number = 0;
  quantity: number = 0;
  instructions: string = '';
  imgUrl: string = '';
  codeUser: number = 0;
  
  allIngredients: any[] = [];
  addNewIngredientMode: boolean = false;
  newIngredientName: string = '';

  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private imageService: ImageService,
    private ingredientsService: IngredientsService,
    private ingredientsForRecipeService: IngredientsForRecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.userService.currentUser) {
      this.codeUser = this.userService.currentUser.id;
    }

    this.ingredientsService.get().subscribe({
      next: (ingredients: Ingredients[]) => {
        this.allIngredients = ingredients.map(i => ({
          ...i,
          selected: false,
          amount: ''
        }));
      },
      error: (err) => console.error(err)
    });
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.imageService.add(file).subscribe({
        next: (uploadedUrl) => {
          this.imgUrl = uploadedUrl;
        },
        error: (err) => console.error(err)
      });
    }
  }

  toggleNewIngredientMode(): void {
    this.addNewIngredientMode = !this.addNewIngredientMode;
  }

  saveNewIngredientToDb(): void {
    if (!this.newIngredientName.trim()) return;

    const toAdd: Ingredients = { code: 0, name: this.newIngredientName };
    
    this.ingredientsService.post(toAdd).subscribe({
      next: (ingredient: Ingredients) => {
        this.allIngredients.push({ ...ingredient, selected: true, amount: '' });
        this.newIngredientName = '';
        this.addNewIngredientMode = false;
      },
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    const newRecipe: Recipe = {
      code: 0,
      name: this.name,
      description: this.description,
      difficultyLevel: this.difficultyLevel,
      time: this.time,
      img: this.imgUrl,
      quantity: this.quantity,
      instructions: this.instructions,
      codeUser: this.codeUser
    };
    const selectedIngredientsMap: { [key: number]: string } = {};
    
    this.allIngredients.filter(i => i.selected).forEach(i => {
         selectedIngredientsMap[i.code] = i.amount;
    });

    this.recipeService.add(newRecipe).pipe(
      switchMap((savedRecipe) => {
        return this.ingredientsForRecipeService
               .add(selectedIngredientsMap, savedRecipe.code);
      })
    ).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}