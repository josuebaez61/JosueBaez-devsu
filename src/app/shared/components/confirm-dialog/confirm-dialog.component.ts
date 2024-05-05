import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FullscreenOverlayComponent } from '../fullscreen-overlay/fullscreen-overlay.component';
import {
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
} from '../card/card.component';
import { ButtonComponent } from '../button/button.component';
import { ConfirmService } from '../../../core/services/confirm.service';
import { Observable } from 'rxjs';
import { ConfirmDialogData } from '../../../core/models/confirm';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FullscreenOverlayComponent,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    CardFooterComponent,
    ButtonComponent,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  visible$: Observable<boolean>;
  data$: Observable<ConfirmDialogData | null>;

  constructor(private confirmService: ConfirmService) {
    this.visible$ = this.confirmService.visible$;
    this.data$ = this.confirmService.confirmDialogData$;
  }

  onCancel(): void {
    this.confirmService.close();
  }

  onConfirm(cb?: () => void): void {
    this.confirmService.close();
    cb && cb();
  }
}
