import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl='http://localhost:4000/api/v1/posts'
  constructor(private http:HttpClient) { }
  getPostsPanigations(req:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/paginated`,{params:req})
  }
  totalPost(){
    return this.http.get<any>(`${this.apiUrl}/count`)
  }
  getPostById(postId:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${postId}`)
  }
  searchPost(req:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/search`,{ params:req });
  }
}
