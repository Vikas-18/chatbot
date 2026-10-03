import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Complaint } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.css']
})
export class ComplainComponent implements OnInit {
  name = '';
  email = '';
  contact = '';
  hostel = '';
  room = '';
  problem = '';
  comment = '';
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

  problems: string[] = [
    'Electricity',
    'Food',
    'Water',
    'Furniture',
    'Room Cleaning',
    'Ragging',
    'Others'
  ];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.toastService.info('Please log in to register a complaint');
      this.router.navigate(['/login']);
      return;
    }

    // Support query parameter for preselecting problem category
    this.route.queryParams.subscribe(params => {
      if (params['type']) {
        const matched = this.problems.find(
          p => p.toLowerCase() === params['type'].toLowerCase()
        );
        if (matched) {
          this.problem = matched;
        }
      }
    });
  }

  handleSubmit(): void {
    if (!this.name || !this.hostel || !this.room || !this.problem) {
      this.toastService.error('Please fill in all required fields');
      return;
    }

    this.loading = true;
    const complaint: Complaint = {
      name: this.name.trim(),
      roomNo: this.room.trim(),
      description: this.comment ? this.comment.trim() : `${this.problem} problem reported in ${this.hostel} Room ${this.room}`,
      type: this.problem,
      hostelName: this.hostel,
      resolved: false
    };

    this.apiService.submitComplaint(complaint).subscribe({
      next: (res) => {
        this.loading = false;
        this.toastService.success('Complaint Registered Successfully!');
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (err) => {
        this.loading = false;
        console.error('Complaint submission error:', err);
        this.toastService.error('Error occurred while registering complaint. Please try again.');
      }
    });
  }
}
