import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  username: string;

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(resp => this.isLoggedIn = resp);
    this.authService.username.subscribe(resp => this.username = resp);

    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();
  }

  logout(): void {
    this.authService.logout();
    this.toastr.info('Sesión Cerrada');
    this.router.navigate(['home']);
  }

  goToUserProfile(): void {
    this.router.navigate(['profile/my-posts']);
  }

}
