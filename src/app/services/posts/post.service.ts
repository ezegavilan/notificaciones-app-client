import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../clases/post';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  urlEndpoint: string;

  constructor(private http: HttpClient) {
    this.urlEndpoint = 'http://localhost:8080/api';
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post(`${this.urlEndpoint}/posts`, post).pipe(
      map((response: any) => response.post as Post)
    );
  }

  getPosts(): Observable<Post[]> {
    return this.http.get(`${this.urlEndpoint}/posts`).pipe(
      map((response: any) => {
        return response.posts as Post[];
      })
    );
  }

  getUserPosts(username: string): Observable<Post[]> {
    return this.http.get(`${this.urlEndpoint}/posts/by-username/${username}`).pipe(
      map((response: any) => response.posts as Post[])
    );
  }
}
