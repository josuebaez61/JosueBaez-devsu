import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputTextDirective } from '../../directives/input-text.directive';
import { FormsModule } from '@angular/forms';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { PageEvent } from '../../../core/models/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, InputTextDirective, FormsModule, IconButtonComponent],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input()
  totalItems = 0;

  @Input()
  offset = 0;

  @Input()
  limit = 10;

  @Output()
  itemsPerPageChange = new EventEmitter();

  perPageOptions = [5, 10, 20];

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.limit);
  }

  get hasNext(): boolean {
    return this.offset + this.limit <= this.totalItems;
  }

  @Output()
  onPage = new EventEmitter<PageEvent>();

  onItemsPerPageChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.itemsPerPageChange.emit(parseInt(selectedValue, 10));
  }

  onNextPage(): void {
    this.offset += this.limit;
    this.onPage.emit(
      new PageEvent(this.offset, this.offset + this.limit, this.limit)
    );
  }
  onPrevPage(): void {
    this.offset -= this.limit;
    this.onPage.emit(
      new PageEvent(this.offset, this.offset + this.limit, this.limit)
    );
  }
}
