import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@/interface/User.interface';
import { environment } from '@/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly url: string = `${environment.apiBaseUrl}/api/User`;

  isLoggedIn: boolean = false;
  currentUser: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  get(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.url}?email=${email}&password=${password}`);
  }

  post(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }
}
