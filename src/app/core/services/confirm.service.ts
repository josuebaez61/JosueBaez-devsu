import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfirmDialogData } from '../models/confirm';

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  private _visible$ = new BehaviorSubject(false);
  visible$ = this._visible$.asObservable();

  private _confirmDialogData$ = new BehaviorSubject<ConfirmDialogData | null>(
    null
  );
  confirmDialogData$ = this._confirmDialogData$.asObservable();

  constructor() {}

  open(data: ConfirmDialogData): void {
    this._visible$.next(true);
    this._confirmDialogData$.next(data);
  }

  close(): void {
    this._visible$.next(false);
    this._confirmDialogData$.next(null);
  }
}
