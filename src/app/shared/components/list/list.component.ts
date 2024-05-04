import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [],
  template: ` <li (click)="onClick.emit($event)">
    <ng-content />
  </li>`,
})
export class ListItemComponent {
  @Output()
  onClick = new EventEmitter<MouseEvent>();
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {}
