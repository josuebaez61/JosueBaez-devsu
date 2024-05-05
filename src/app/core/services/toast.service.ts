import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ToastMessage } from '../models/toast';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly defaultDuration = 5000;
  private _toastMessage$ = new BehaviorSubject<ToastMessage | null>(null);
  toastMessage$ = this._toastMessage$.asObservable();
  isVisible$ = this.toastMessage$.pipe(map((m) => !!m));

  constructor() {}

  show(message: ToastMessage): void {
    const duration = message.duration || this.defaultDuration;
    this._toastMessage$.next(message);
    setTimeout(() => {
      this._toastMessage$.next(null);
    }, duration);
  }

  showSuccessfullySaved(): void {
    this.show({
      message: '¡Guardado realizado!',
      severity: 'success',
    });
  }
}
