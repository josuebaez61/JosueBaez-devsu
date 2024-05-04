import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ContentChild, Input } from '@angular/core';

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
export class TableComponent implements AfterViewInit {
  @Input()
  data: any[] = [];

  @Input()
  tableStyleClass = '';

  @ContentChild('header')
  header: any;

  @ContentChild('body')
  body: any;

  ngAfterViewInit(): void {
    console.log(this.body);
  }
}
