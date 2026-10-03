import { Component, OnInit } from '@angular/core';
import { ToastService, ToastMessage } from './services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hostel ChatBot';
  toasts$!: Observable<ToastMessage[]>;

  constructor(public toastService: ToastService) {}

  ngOnInit(): void {
    this.toasts$ = this.toastService.toasts$;
  }

  closeToast(id: number): void {
    this.toastService.remove(id);
  }
}
