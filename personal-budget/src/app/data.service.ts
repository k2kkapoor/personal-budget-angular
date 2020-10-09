import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// 6.Create a new Angular Service called "data", and make sure that
// The Http call to the backend will populate a variable inside the DataService
// And that the Charts that you have implemented are reading the data from the DataService and not from a local variable
export class DataService {
  private dataPath = 'http://localhost:3000/budget';
  constructor(private http: HttpClient) {}
  //7. Also, make sure that the method that makes the call to the backend service will only be executed if the variable inside the DataService is empty. If the variable inside the DataService is full, then there is no need to make a new call to the backend
  getData(): Observable<any> {
    return this.http.get(this.dataPath);
  }
}
