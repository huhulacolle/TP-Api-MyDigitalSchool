import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

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
        console.log(data);
      }
    )
    .catch(
      error => {
        console.error(error.error);
      }
    )
  }

}
