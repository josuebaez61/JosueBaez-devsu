import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInputText]',
  standalone: true,
})
export class InputTextDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, 'form-control');
    console.log('here');
  }
}
