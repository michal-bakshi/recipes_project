import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '@/service/User.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent {
  constructor(private userService:UserService)
  {}

  getIsLoggedIn(){
    return this.userService.isLoggedIn;
  }
}
