import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http : Http) { }

  getItems(){
    return this.http.get("https://static.usabilla.com/recruitment/apidemo.json");  
  }
}
