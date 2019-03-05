import { Preferences } from './../models/preferences';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})

export class BlogService {

  constructor(private http: HttpClient) {}
  public url: 'http://localhost:8383/api/';

  getAllPreferences(): Observable<Preferences[]> {
    return this.http.get<Preferences[]>('http://localhost:8383/api/preference/all');
  }
}
