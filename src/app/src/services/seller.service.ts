import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private apiUrl = "http://localhost:4000/api/v1"
    constructor(private http:HttpClient) { }
      getAllSeller(req:any):Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/admin/registered-sellers`);   
      }
      getTotalSeller():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/admin/registered-sellers`);   
      }
      getTotalRequestSeller():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/admin/pending-sellers`);   
      }
      getAllRequestSeller(req:any):Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/admin/pending-sellers`);   
      }
      getSellerById(doctorId:string):Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/auth/users/${doctorId}`);
      }
      approveSeller(userId:string):Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/admin/approve-seller/${userId}`,null);   
      }
  
      
}
