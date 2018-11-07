import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http : Http) { }

  getItems(){
    console.log(this.http.get("https://static.usabilla.com/recruitment/apidemo.json"))
    return this.http.get("https://static.usabilla.com/recruitment/apidemo.json");  
  }
}
