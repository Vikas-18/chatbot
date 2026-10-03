import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService, Complaint } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-complain-table',
  templateUrl: './complain-table.component.html',
  styleUrls: ['./complain-table.component.css']
})
export class ComplainTableComponent implements OnInit, OnChanges {
  @Input() complaints: Complaint[] = [];

  complaintsData: Complaint[] = [];
  selectedOption = '';
  resolvingIds = new Set<string>();

  categories: string[] = [
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
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.complaintsData = [...this.complaints];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['complaints']) {
      this.complaintsData = [...this.complaints];
    }
  }

  get filteredComplaints(): Complaint[] {
    if (!this.selectedOption) {
      return this.complaintsData;
    }
    return this.complaintsData.filter(
      c => c.type?.toLowerCase() === this.selectedOption.toLowerCase()
    );
  }

  handleResolve(complaint: Complaint): void {
    if (!complaint.id || complaint.resolved) return;

    this.resolvingIds.add(complaint.id);

    this.apiService.resolveComplaint(complaint.id).subscribe({
      next: (resolvedComplaint) => {
        this.resolvingIds.delete(complaint.id!);
        complaint.resolved = true;
        this.toastService.success(`Complaint for ${complaint.name} marked as resolved!`);
      },
      error: (err) => {
        this.resolvingIds.delete(complaint.id!);
        console.error('Resolve error:', err);
        // If it's already resolved or permission error:
        this.toastService.error('Failed to resolve complaint. Admin permission required.');
      }
    });
  }
}
