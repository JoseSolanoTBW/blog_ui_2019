import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  constructor(private http: HttpClient) {}
   url: 'http://localhost:8383/api/todo';

  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
}
