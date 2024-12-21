import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = "http://localhost:4000/api/v1"
  constructor(private http:HttpClient) { }
    getAllDoctor(req:any):Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/admin/registered-doctors`);   
    }
    getTotalDoctor():Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/admin/registered-doctors`);   
    }
    getTotalRequestDoctor():Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/admin/pending-doctors`);   
    }
    getAllRequestDoctor(req:any):Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/admin/pending-doctors`);   
    }
    getDoctorById(doctorId:string):Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/auth/users/${doctorId}`);
    }
    approveDoctor(userId:string):Observable<any>{
      return this.http.post<any>(`${this.apiUrl}/admin/approve-doctor/${userId}`,null);   
    }

    
}
