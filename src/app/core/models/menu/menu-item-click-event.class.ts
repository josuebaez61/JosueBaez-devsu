import { MenuItem } from './menu-item.class';

export class MenuItemClickEvent {
  constructor(public defaultEvent: MouseEvent, item: MenuItem) {}
}
