import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  constructor(private blogService : BlogService) { }

  ngOnInit() {
  }

  logOut(){
    localStorage.removeItem('user');
  }

  recommendations(){
    this.blogService.performSearch.next(0);
  }

  myPosts(){
    this.blogService.performSearch.next(1);
  }

  liked(){
    this.blogService.performSearch.next(2);
  }
}
