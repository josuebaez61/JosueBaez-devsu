import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputTextDirective } from '../../directives/input-text.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [InputTextDirective, FormsModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input()
  perPage = 10;

  @Output()
  perPageChange = new EventEmitter<number | string>();

  @Input()
  totalItems = 0;

  @Input()
  totalFilteredItems = 0;

  perPageOptions = [5, 10, 20];
}
