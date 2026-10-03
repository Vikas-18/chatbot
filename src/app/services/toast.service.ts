import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  id: number;
  text: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private counter = 0;
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  show(text: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3500): void {
    const id = ++this.counter;
    const toast: ToastMessage = { id, text, type };
    const current = this.toastsSubject.value;
    this.toastsSubject.next([...current, toast]);

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  success(text: string, duration: number = 3500): void {
    this.show(text, 'success', duration);
  }

  error(text: string, duration: number = 3500): void {
    this.show(text, 'error', duration);
  }

  info(text: string, duration: number = 3500): void {
    this.show(text, 'info', duration);
  }

  remove(id: number): void {
    const updated = this.toastsSubject.value.filter(t => t.id !== id);
    this.toastsSubject.next(updated);
  }
}
