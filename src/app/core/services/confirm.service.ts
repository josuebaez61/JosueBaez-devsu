import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  private _visible$ = new BehaviorSubject(false);
  visible$ = this._visible$.asObservable();

  private _defaultConfirmDialogData = {
    message: 'esta seguro?',
  };

  private _confirmDialogData$ = new BehaviorSubject(
    this._defaultConfirmDialogData
  );
  confirmDialogData$ = this._confirmDialogData$.asObservable();

  constructor() {}

  open(data: { message: string }): void {
    this._visible$.next(true);
    this._confirmDialogData$.next(data);
  }

  close(): void {
    this._visible$.next(false);
    this._confirmDialogData$.next(this._defaultConfirmDialogData);
  }
}
