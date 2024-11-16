import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl='http://localhost:4000/api/v1/products'
  constructor(private http:HttpClient) { }
  getProduct(req:any):Observable<any>{
    return this.http.get(this.apiUrl,{params:req});
  }
  getAllProduct():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
  getProductById(productId:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${productId}`)
  }
}