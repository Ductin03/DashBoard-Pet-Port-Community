import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl='http://localhost:4000/api/v1/admin/pet-owners'
  constructor(private http:HttpClient) { }
  getAllPetowner():Observable<any>{
    return this.http.get<any>(this.apiUrl);   
  }
}
