import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  enrollmentNumber = '';
  password = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  handleSubmit(): void {
    if (!this.enrollmentNumber || !this.password) {
      this.toastService.error('Please fill in all fields');
      return;
    }

    this.loading = true;
    this.authService.login(this.enrollmentNumber.trim(), this.password).subscribe({
      next: (response) => {
        this.loading = false;
        this.toastService.success('Login Successful! Welcome.');
        this.router.navigate(['/chatbot']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Login error:', err);
        if (err.status === 401 || err.status === 404 || err.status === 400) {
          this.toastService.error('Enrollment Number does not exist or Password is incorrect');
        } else {
          this.toastService.error('Login failed. Please check connection and try again.');
        }
      }
    });
  }
}
