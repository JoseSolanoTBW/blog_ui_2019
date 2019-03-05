import { Preferences } from './../models/preferences';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from '../models/user';

@Injectable({
  providedIn: "root"
})

export class BlogService {

  constructor(private http: HttpClient) {}
  public url: 'http://localhost:8383/api/';

  getAllPreferences(): Observable<Preferences[]> {
    return this.http.get<Preferences[]>('http://localhost:8383/api/preference/all');
  }

  createUser(user: User) : Observable<User>{
    return this.http.post<User>('http://localhost:8383/api/user/sing-in', user);
  }

  login(nickname: string): Observable<User>{
    return this.http.get<User>('http://localhost:8383/api/user/log-in?nickName='+ nickname);
  }
}
