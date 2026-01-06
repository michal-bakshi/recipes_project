import { Component } from '@angular/core';
import { UserService } from '../../service/User.service';
import { User } from '../../interface/User.interface';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private userService:UserService,private router:Router){
  }
firstName:string=""
lastName:string=""
email:string=""
password:string=""

addUser(){
  const user:User={
    code:0,
  firsName: this.firstName,
  lastName: this.lastName,
  email: this.email,
  password:this.password
  };
  this.userService.post(user).subscribe({
    next:(user:User)=>{
      console.log('נרשמת בהצלחה',user);
      this.userService.currentUser=user;
      this.userService.isLoggedIn=true;
       this.router.navigate(['/']);

    },
    error:(err)=>{
      console.error('שגיאת הרשמה',err)
    }
  })
}
}
