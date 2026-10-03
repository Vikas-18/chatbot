import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  name = '';
  rollNo = '';
  hostelName = '';
  roomNo = '';
  password = '';
  cpassword = '';
  loading = false;

  hostels: string[] = [
    'Hostel-Mahanadi',
    'Hostel-Indrawati',
    'PG Hostel',
    'Seonath',
    'Hostel-Mainput',
    'Hostel-Chitrakot',
    'Hostel-Malhar',
    'Hostel-Kotumsar',
    'Hostel-Sirpur'
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  handleSubmit(): void {
    if (!this.name || !this.rollNo || !this.hostelName || !this.roomNo || !this.password) {
      this.toastService.error('Please fill in all fields');
      return;
    }

    if (this.password.length < 6) {
      this.toastService.error('Password must be at least 6 characters long');
      return;
    }

    if (this.password !== this.cpassword) {
      this.toastService.error('Passwords do not match');
      return;
    }

    this.loading = true;
    const studentData = {
      name: this.name.trim(),
      rollNo: this.rollNo.trim(),
      hostelName: this.hostelName,
      roomNo: this.roomNo.trim(),
      password: this.password
    };

    this.authService.signUp(studentData).subscribe({
      next: () => {
        this.loading = false;
        this.toastService.success('Registration successful! Please login.');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.loading = false;
        console.error('Sign up error:', err);
        if (err.status === 409 || err.status === 400) {
          this.toastService.error('Enrollment Number already exists');
        } else {
          this.toastService.error('Registration failed. Please try again.');
        }
      }
    });
  }
}
