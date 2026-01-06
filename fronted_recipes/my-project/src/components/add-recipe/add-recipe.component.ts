import { Component } from '@angular/core';
import { RecipeService } from '../../service/Recipe.service';
import { UserService } from '../../service/User.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Recipe } from '../../interface/Recipe.interface';
import { ImageService } from '../../service/Image.service';
import { IngredientsForRecipe } from '../../interface/IngredientsForRecipe.interface';
import { Ingredients } from '../../interface/Ingredients.interface';
import { IngredientsService } from '../../service/Ingredients.service';
import { IngredientsForRecipeService } from '../../service/IngredientsForRecipe.service';

@Component({
  selector: 'app-add-recipe',
  imports: [FormsModule,RouterModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {
constructor(private recipeService:RecipeService,private userService:UserService,private imageService:ImageService,private ingredientsService:IngredientsService,private ingredientsForRecipyService:IngredientsForRecipeService,private router:Router) { 
  this.ngOnInit();
}


name:string="";
description:string="";;
difficultyLevel:number=0;
time:number=0;
quantity:number=0;
instructions:string="";
codeUser:number=0;
img:string="";
selectedFile:File | null = null;
ingredientsList: { [key: number]: string } = {};
ingredientName: Ingredients[] =[];
addNewIngredient:boolean=false;
nameNewIngredient:string=""
codeRecipy:number=0;

 ngOnInit(){
this.codeUser=this.userService.currentUser.code;
console.log(this.userService.currentUser);
  this.ingredientsService.get().subscribe({
    next:(ingredients:Ingredients[])=>{
     this.ingredientName = ingredients.map(i => ({
  ...i,
  selected: false,
  amount: ''
}));
      console.log('רשימת המרכיבים',this.ingredientsList);
   },
    error:(err)=>{
      console.error('שגיאה',err);
    }
  });
}
  addIngredient(){
    debugger
    this.addNewIngredient=true;
  }
  addIngredientForList(){
    const toAdd:Ingredients={code:0,name:this.nameNewIngredient};
   debugger
   this.ingredientsService.post(toAdd).subscribe({
      next: (ingredient:Ingredients) => {
        console.log('המרכיב נוסף בהצלחה:', ingredient);
        this.ingredientName.push(ingredient);
       this.nameNewIngredient = '';
        this.addNewIngredient = false;

      },
      error: (err) => {
        console.error('שגיאה בהוספת מרכיב', err);
        alert('שגיאה בהוספת מרכיב');
      }
    });
  }

  saveIngredient(newI:Ingredients){
    this.ingredientsList[newI.code]=newI.amount||'';
 
    

  }
  test(){
       console.log(this.difficultyLevel);
  }

onSubmit(){
  const recipe:Recipe ={
    code:0,
    name: this.name,
    description: this.description,
    difficultyLevel: this.difficultyLevel,
    time: this.time,
    img:this.img,
    quantity: this.quantity,
    instructions: this.instructions,
    codeUser: this.codeUser
  };

  // this.ingredientsList[] = this.ingredientName
  // this.ingredientName.filter(i => i.selected && i.amount)
  // .map(i => ({
  //   ingredientCode: i.code,
  //   amount: (i.amount !== null && i.amount !== undefined) ? i.amount : ''
  //   this.ingredientsList[i.code]=i.amount
  // }));


   this.recipeService.add(recipe).subscribe({
      next: (recipe) => {
        console.log('המתכון נוסף בהצלחה', recipe);
        alert('המתכון נוסף בהצלחה');
  
        this.ingredientsForRecipyService.add(this.ingredientsList, recipe.code).subscribe({
          next: (ingredientsForRecipe: IngredientsForRecipe[]) => {
            console.log('המרכיבים למתכון נוספו בהצלחה:', ingredientsForRecipe);
             this.router.navigate(['/']);

          },
          error: (err) => {
            console.error('שגיאה בהוספת מרכיבים למתכון', err);
            alert('שגיאה בהוספת מרכיבים למתכון');
          }
        });
      },
      error: (err) => {
        console.error('שגיאה', err);
        alert('שגיאה');
      }
    });
  }



//    this.ingredientsService.post(this.ingredientsList,this.codeRecipy).subscribe({
//        next:(ingredient)=>{
//       console.log('הרכיב נוסף בהצלחה',ingredient);
//        this.ingredientName.push(ingredient);
//         this.nameNewIngredient ={code:0,name:""};
//         this.addNewIngredient = false;
//       alert('הרכיב נוסף בהצלחה');
    
//     },
//     error:(err)=>{
//       console.error('שגיאה',err)
//       alert('שגיאה');
//     }
//     })
// }

addImage(event:any):void{
const file:File=event.target.files[0];
if (file) {
  this.imageService.add(file).subscribe({
    next:(imageUrl) => {
      console.log('Image uploaded successfully:', imageUrl)
      this.img = imageUrl; 
    },
    error:(err) => {
      console.error('Error uploading image:', err);
    }})
  }};


}

