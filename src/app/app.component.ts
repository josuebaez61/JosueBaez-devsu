import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConfirmDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'financial-products';
}
