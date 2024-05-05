import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollX]',
  standalone: true,
})
export class ScrollXDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    const wrapperDiv = this.renderer.createElement('div');
    this.renderer.setStyle(wrapperDiv, 'overflow', 'auto');
    this.renderer.setStyle(wrapperDiv, 'max-width', '100vw');

    const parentElement = this.renderer.parentNode(this.el.nativeElement);
    this.renderer.insertBefore(
      parentElement,
      wrapperDiv,
      this.el.nativeElement
    );
    this.renderer.appendChild(wrapperDiv, this.el.nativeElement);
  }
}
