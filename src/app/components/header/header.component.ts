import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';

declare function inicializarNotificaciones(target: HTMLElement, userEmail: string);

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('notificationsInbox') notificationsInbox: ElementRef;
  isLoggedIn: boolean;
  username: string;
  userEmail: string;

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(resp => this.isLoggedIn = resp);
    this.authService.username.subscribe(resp => this.username = resp);
    this.authService.userEmail.subscribe(resp => this.userEmail = resp);

    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();
    this.userEmail = this.authService.getUserEmail();
  }

  ngAfterViewInit(): void {
    this.inicNotis();
  }

  inicNotis(): void {
    if (!this.authService.isLoggedIn()) {
      return ;
    }
    let notificationsInboxHtmlElement = this.notificationsInbox?.nativeElement as HTMLElement;
    inicializarNotificaciones(notificationsInboxHtmlElement, this.userEmail);
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
