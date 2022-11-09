import { lastValueFrom } from 'rxjs';
import { Posts } from './../interfaces/posts';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient
  ) { }

  getPosts(): Promise<Posts> {
    return lastValueFrom(this.http.get<Posts>(environment.api + "posts/"))
  }

}
