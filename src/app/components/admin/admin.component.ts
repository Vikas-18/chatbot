import { Component, OnInit } from '@angular/core';
import { ApiService, Complaint } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  passkey = '';
  complaints: Complaint[] = [];
  loading = false;
  isAuthenticated = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAdminLoggedIn()) {
      this.isAuthenticated = true;
      this.loadComplaints();
    }
  }

  handleSubmit(): void {
    if (!this.passkey) {
      this.toastService.error('Please enter the admin key');
      return;
    }

    this.loading = true;
    this.authService.adminLogin(this.passkey).subscribe({
      next: (res) => {
        this.isAuthenticated = true;
        this.toastService.success('Admin Authentication Successful');
        this.loadComplaints();
      },
      error: (err) => {
        this.loading = false;
        console.error('Admin login error:', err);
        this.toastService.error('Invalid Admin Key. Please try again.');
      }
    });
  }

  loadComplaints(): void {
    this.loading = true;
    this.apiService.getComplaints().subscribe({
      next: (data) => {
        this.loading = false;
        this.complaints = data || [];
        this.toastService.success(`Loaded ${this.complaints.length} complaints.`);
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to load complaints:', err);
        this.toastService.error('Failed to load complaints from backend');
      }
    });
  }

  handleAdminLogout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.complaints = [];
    this.passkey = '';
    this.toastService.info('Logged out from Admin panel');
  }
}
