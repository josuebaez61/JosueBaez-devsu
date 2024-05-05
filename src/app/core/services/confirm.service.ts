import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ConfirmDialogData } from '../models/confirm';

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  private _confirmDialogData$ = new BehaviorSubject<ConfirmDialogData | null>(
    null
  );
  confirmDialogData$ = this._confirmDialogData$.asObservable();
  visible$ = this.confirmDialogData$.pipe(map((d) => !!d));

  constructor() {}

  open(data: ConfirmDialogData): void {
    this._confirmDialogData$.next(data);
  }

  close(): void {
    this._confirmDialogData$.next(null);
  }
}
