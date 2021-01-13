import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/posts/post.service';
import { Post } from '../../clases/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe(response => {
      this.posts = response;
    });
  }

}
