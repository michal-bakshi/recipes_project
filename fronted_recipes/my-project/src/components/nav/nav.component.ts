import { Component } from '@angular/core';
import { User } from '../../interface/User.interface';
import { UserService } from '../../service/User.service';
import { LoginComponent } from '../login/login.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';

@Component({
  selector: 'app-nav',
  imports: [LoginComponent,RouterLink,RouterOutlet,RegisterComponent,AddRecipeComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(private userService:UserService){
  }
getIsLoggedIn(){
  return this.userService.isLoggedIn;
}
// ngonInt(){
//   this.isLoggin=this.userService.isLoggedIn;
// }


}
