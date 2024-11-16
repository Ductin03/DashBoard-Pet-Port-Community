import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl='http://localhost:4000/api/v1/pets'
  constructor(private http:HttpClient) { }
  getPets(req:any):Observable<any>{
    return this.http.get(this.apiUrl,{params:req});
  }
  getAllPets():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
  getPetById(petId:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${petId}`);
  }
}
