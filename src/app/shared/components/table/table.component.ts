import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  host: {
    ngSkipHydration: 'true',
  },
})
export class TableComponent {
  @Input()
  data: any[] = [];

  @Input()
  className = '';

  @ContentChild('header')
  header!: TemplateRef<unknown>;

  @ContentChild('body')
  body!: TemplateRef<unknown>;
}
