import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl='http://localhost:4000/api/v1/admin/pet-owners'
  private apiUrlEditUser ='http://localhost:4000/api/v1/auth/users'
  constructor(private http:HttpClient) { }
  getAllPetowner():Observable<any>{
    return this.http.get<any>(this.apiUrl);   
  }
  editAdmin(userId:string,productData:any):Observable<any>{

    const headers=new HttpHeaders({'Content-type':'application/json'});

    return this.http.put<any>(`${this.apiUrlEditUser}/${userId}`, productData,{headers})
  }
}
