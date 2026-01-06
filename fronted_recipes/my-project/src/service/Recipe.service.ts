import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Recipe } from "../interface/Recipe.interface";
import { environment } from "../environments/environment";

@Injectable({providedIn: "root"})

export class RecipeService {

    url:string=`${environment.apiBaseUrl}/api/Recipe`;
    constructor(private http: HttpClient) { }
    GetAll():Observable<Recipe[]>{
      return this.http.get<Recipe[]>(this.url);
    }
    Get(code:number):Observable<Recipe>{
      return this.http.get<Recipe>(this.url+`/${code}`);
    }
    add(recipe:Recipe):Observable<Recipe>{
      return this.http.post<Recipe>(this.url, recipe);
    }
    
}