import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { LoginRequest } from '../../../clases/login-request';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isError: boolean;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home']);
    }
    this.crearForm();
  }

  crearForm(): void {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login(): void {
    const loginRequest: LoginRequest = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    };

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(loginRequest).subscribe(response => {
      this.router.navigate(['/home']);
      window.location.reload();
    }, err => {
      this.isError = true;
      console.log(err);
    });
  }

  get usernameValidator(): boolean {
    return this.loginForm.get('username').invalid && this.loginForm.get('username').touched;
  }
  
  get passwordValidator(): boolean {
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
  }
}
