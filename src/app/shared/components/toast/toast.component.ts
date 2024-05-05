import { Component } from '@angular/core';
import { CardBodyComponent, CardComponent } from '../card/card.component';
import { ToastService } from '../../../core/services/toast.service';
import { Observable } from 'rxjs';
import { ToastMessage } from '../../../core/models/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, CardComponent, CardBodyComponent],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  isVisible$: Observable<boolean>;
  toastMessage$: Observable<ToastMessage | null>;

  constructor(private toastService: ToastService) {
    this.isVisible$ = this.toastService.isVisible$;
    this.toastMessage$ = this.toastService.toastMessage$;
  }
}
