import { Action } from './../models/action';
import { Post } from './../models/post';
import { Preferences } from './../models/preferences';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from '../models/user';
import { PostSearchParams } from '../models/post-search-params';

@Injectable({
  providedIn: "root"
})

export class BlogService {

  constructor(private http: HttpClient) {}
  public url: 'http://localhost:8383/api/';
  public performSearch: BehaviorSubject<any> = new BehaviorSubject(null);
  public isSaved: BehaviorSubject<boolean> = new BehaviorSubject(false);

  getAllPreferences(): Observable<Preferences[]> {
    return this.http.get<Preferences[]>('http://localhost:8383/api/preference/all');
  }

  createUser(user: User) : Observable<User>{
    return this.http.post<User>('http://localhost:8383/api/user/sing-in', user);
  }

  login(nickname: string): Observable<User>{
    return this.http.get<User>('http://localhost:8383/api/user/log-in?nickName='+ nickname);
  }

  getPosts(postParameters: PostSearchParams): Observable<Post[]>{
    return this.http.post<Post[]>('http://localhost:8383/api/post/get-posts', postParameters);
  }

  createPost(postUser: Post): Observable<Post>{
    return this.http.post<Post>('http://localhost:8383/api/post/create', postUser);
  }

  createAction(postAction: Action): Observable<Post>{
    return this.http.post<Post>('http://localhost:8383/api/action/create', postAction);
  }

  updateAction(postAction: Action): Observable<Action>{
    return this.http.put<Action>('http://localhost:8383/api/action/update', postAction);
  }
}
