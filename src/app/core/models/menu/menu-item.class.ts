import { IMenuItemProps } from './menu-item-props.interface';

export class MenuItem implements IMenuItemProps {
  label?: string;
  onClick?: () => void;
  constructor(props: IMenuItemProps) {
    this.label = props.label;
    this.onClick = props.onClick;
  }
}
