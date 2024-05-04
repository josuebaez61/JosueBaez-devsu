import { Component } from '@angular/core';
import { InputTextDirective } from '../../directives/input-text.directive';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [InputTextDirective],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {}
