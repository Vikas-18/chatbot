import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  click = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  handleClick(): void {
    this.click = !this.click;
  }

  closeMobileMenu(): void {
    this.click = false;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.closeMobileMenu();
    this.toastService.info('Logged out successfully');
    this.router.navigate(['/login']);
  }
}
