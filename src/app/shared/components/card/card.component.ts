import { CommonModule } from '@angular/common';
import { Component, ContentChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-card-header',
  standalone: true,
  imports: [CommonModule],
  styles: `.app-card-header { padding: 1rem; border-bottom: 2px solid var(--secondary-color) }`,
  template: `
    <div class="app-card-header">
      <ng-content />
    </div>
  `,
})
export class CardHeaderComponent {}
@Component({
  selector: 'app-card-body',
  standalone: true,
  imports: [CommonModule],
  styles: `.app-card-body { padding: 1rem }`,
  template: `
    <div class="app-card-body">
      <ng-content />
    </div>
  `,
})
export class CardBodyComponent {}

@Component({
  selector: 'app-card-footer',
  standalone: true,
  imports: [CommonModule],
  styles: `.app-card-footer { padding: 1rem;  border-top: 2px solid var(--secondary-color) }`,
  template: `
    <div class="app-card-footer">
      <ng-content />
    </div>
  `,
})
export class CardFooterComponent {}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @ContentChild(CardHeaderComponent)
  cardHeader?: CardHeaderComponent;

  @Input()
  className = '';

  @Input()
  style = '';
}
