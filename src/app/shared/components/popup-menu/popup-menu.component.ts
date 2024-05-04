import { Component, ContentChild, HostListener, Input } from '@angular/core';
import { CardBodyComponent, CardComponent } from '../card/card.component';
import { ListComponent, ListItemComponent } from '../list/list.component';
import { MenuItem } from '../../../core/models';
import { CommonModule } from '@angular/common';
import { FullscreenOverlayComponent } from '../fullscreen-overlay/fullscreen-overlay.component';

@Component({
  selector: 'app-popup-menu',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ListComponent,
    ListItemComponent,
    CardBodyComponent,
    FullscreenOverlayComponent,
  ],
  templateUrl: './popup-menu.component.html',
  styleUrl: './popup-menu.component.scss',
})
export class PopupMenuComponent {
  @Input()
  menu: MenuItem[] = [];

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.visible = false;
  }

  private _visible = false;

  get visible(): boolean {
    return this._visible;
  }

  set visible(val: boolean) {
    this._visible = val;

    if (!val) {
      this.posY = 0;
      this.posX = 0;
    }
  }

  posX = 0;
  posY = 0;

  get transformStyle() {
    return `top: ${this.posY}px; left: ${this.posX}px; position: absolute`;
  }

  toggle(ev: MouseEvent): void {
    this.visible = !this.visible;
    this.posX = ev.clientX;
    this.posY = ev.clientY;
  }
}
