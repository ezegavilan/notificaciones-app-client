import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  username: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(resp => this.isLoggedIn = resp);
    this.authService.username.subscribe(resp => this.username = resp);

    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();
  }

}
