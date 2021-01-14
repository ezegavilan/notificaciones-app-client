import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../../services/posts/post.service';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../../../clases/post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;

  constructor(private postService: PostService,
              private authService: AuthService,
              private toastr: ToastrService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.toastr.error("Debes iniciar sesión");
      this.router.navigate(['login']);
    }
    this.crearForm();
  }

  crearForm(): void {
    this.postForm = this.fb.group({
      nombrePost: ["", Validators.required],
      descripcion: ["", Validators.required]
    });
  }

  nuevoPost(): void {
    const newPost: Post = new Post();
    newPost.nombrePost = this.postForm.controls.nombrePost.value;
    newPost.descripcion = this.postForm.controls.descripcion.value;

    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    this.postService.createPost(newPost).subscribe(response => {
      console.log(response.username);
      this.toastr.success(`¡Post ${response.nombrePost} creado con éxito!`);
    }, err => {
      console.log(err);
      this.toastr.error(err.error.error);
    });
  }

  get nombrePostInvalid(): boolean {
    return this.postForm.get('nombrePost').invalid && this.postForm.get('nombrePost').touched;
  }

  get descripcionInvalid(): boolean {
    return this.postForm.get('descripcion').invalid && this.postForm.get('descripcion').touched;
  }
}
