import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl='http://localhost:4000/api/v1/orders'
  constructor(private http:HttpClient) { }
  getAllOrder():Observable<any>{
    return this.http.get<any>(this.apiUrl);   
  }
}
