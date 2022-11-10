import { PostsService } from 'src/app/services/posts.service';
import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/interfaces/posts';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Posts[] = [];

  constructor(
    private storageService: StorageService,
    private router: Router,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    if (!this.storageService.isLoggedIn()) {
      this.router.navigateByUrl("/")
    }

    this.getPosts();
  }

  getPosts(): void {
    this.postsService.getPosts()
    .then(
      data => {
        this.posts = data;
      }
    )
    .catch(
      error => {
        console.error(error);
      }
    )
  }

  logout(): void {
    this.storageService.removeUser();
  }

}
