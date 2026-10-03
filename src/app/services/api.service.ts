import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Complaint {
  id?: string;
  name: string;
  roomNo: string;
  description: string;
  type: string;
  hostelName: string;
  resolved?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Manual complaint submission (needs student authentication)
  submitComplaint(complaint: Complaint): Observable<Complaint> {
    return this.http.post<Complaint>(`${this.baseUrl}/complaints`, complaint);
  }

  // AI-assisted complaint submission (needs student authentication)
  submitComplaintAi(message: string): Observable<Complaint> {
    return this.http.post<Complaint>(`${this.baseUrl}/complaints/ai`, { message });
  }

  // Admin / Authenticated: Get all complaints
  getComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/complaints`);
  }

  // Admin / Authenticated: Get complaints by type
  getComplaintsByType(type: string): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/complaints/type/${type}`);
  }

  // Admin / Authenticated: Get complaints by resolution status
  getComplaintsByResolutionStatus(resolved: boolean): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/complaints/resolved/${resolved}`);
  }

  // Admin / Authenticated: Get complaints by hostel
  getComplaintsByHostelName(hostelName: string): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/complaints/hostel/${hostelName}`);
  }

  // Admin: Resolve a complaint
  resolveComplaint(complaintId: string): Observable<Complaint> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    return this.http.post<Complaint>(`${this.baseUrl}/admin/complaints/resolve`, complaintId, { headers });
  }
}
