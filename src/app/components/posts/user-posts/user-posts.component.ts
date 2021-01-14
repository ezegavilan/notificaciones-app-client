import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/posts/post.service';
import { Post } from '../../../clases/post';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {

  myPosts: Post[];

  constructor(private authService: AuthService,
              private postService: PostService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMyPosts();
  }

  getMyPosts(): void {
    let username: string;

    username = this.authService.getUsername();

    if (!username) {
      this.toastr.error("Debes iniciar sesión");
      this.router.navigate(['login']);
    }

    this.postService.getUserPosts(username).subscribe(response => this.myPosts = response);
  }

}
