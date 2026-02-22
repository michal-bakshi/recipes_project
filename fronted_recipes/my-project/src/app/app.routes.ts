import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { AddRecipeComponent } from '../components/add-recipe/add-recipe.component';
import { MoreDetailsComponent } from '../components/more-details/more-details.component';

export const routes: Routes = [
    {path:'',component:HomePageComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'addRecipe',component:AddRecipeComponent},
    {path:'moreDetails/:code',component:MoreDetailsComponent}
];
