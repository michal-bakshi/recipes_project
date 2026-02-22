import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '@/interface/User.interface';
import { UserService } from '@/service/User.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onLogin(): void {
    this.errorMessage = '';
    
    if (!this.email || !this.password) {
      this.errorMessage = 'אנא מלא את כל השדות';
      return;
    }

    this.userService.get(this.email, this.password).subscribe({
      next: (user: User) => {
        if (!user) {
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
