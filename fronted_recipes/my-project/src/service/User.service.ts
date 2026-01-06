import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"; 
import { catchError, Observable, throwError } from "rxjs"
import { User } from "../interface/User.interface";
import { environment } from "../environments/environment";

@Injectable ({providedIn: 'root'})


export class UserService{
url:string=`${environment.apiBaseUrl}/api/User`

isLoggedIn:boolean=false;
currentUser:User={code:0,firsName:"",lastName:"",email:"",password:""};
constructor(private http:HttpClient){}

//שליפת משתמש לפי קוד
get(email:string,password:string):Observable<User>
{
return this.http.get<User>(`${this.url}`+`?email=${email}`+`&password=${password}`).pipe(
    catchError(error => {
      return throwError(error);
    })
  )};
post(user: User):Observable<User>{
return this.http.post<User>(this.url,user);
}

}