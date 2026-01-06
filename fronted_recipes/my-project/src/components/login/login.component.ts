import { Component } from '@angular/core';
import { User } from '../../interface/User.interface';
import { UserService } from '../../service/User.service';
import { FormsModule } from '@angular/forms';
import {  Router, RouterModule} from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  u:User={code:0,firsName:"",lastName:"",email:"",password:""};
constructor(private userService:UserService,private router:Router){
}
userName:string=""
password:string=""
errorMessage: string = '';

loginFunc() {
  this.userService.get(this.userName, this.password).subscribe({
    next: (user: User) => {
      if (user==null) {
        alert("שם משתמש או סיסמא שגויים");
        this.errorMessage = 'משתמש לא נמצא. בדוק שוב את הפרטים.';
        return;
      }

      console.log('התחברת בהצלחה', user);
      this.userService.currentUser = user;
      this.userService.isLoggedIn = true;
      this.router.navigate(['/']);
    },
    error: (err) => {
      console.error('שגיאת התחברות', err);
      this.errorMessage = 'שם משתמש או סיסמה שגויים';
    }
  });

}
}
