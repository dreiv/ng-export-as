import { Directive, Input, ElementRef, AfterContentInit, HostListener } from '@angular/core';

@Directive({
  selector: '[tooltip]',
  exportAs: 'tooltip'
})
export class TooltipDirective implements AfterContentInit {
  @Input('tooltip') tooltipTitle!: string;
  tooltip!: HTMLElement;
  isVisible = true;

  constructor(private el: ElementRef) { }

  ngAfterContentInit(): void {
    this._createTooltip();
  }

  @HostListener('mouseover')
  showTooltip(): void {
   this.toggleTooltip();
  }

  @HostListener('mouseout')
  removeTooltip(): void {
    this.toggleTooltip();
  }

  private _createTooltip(): void {
    const elRef = this.el.nativeElement;
    elRef.style.position = 'relative';

    this.tooltip = document.createElement('span');
    this.tooltip.appendChild(document.createTextNode(this.tooltipTitle));
    this.tooltip.style.cssText = 'position: absolute; display: none; color: white; background: black; left: 0; top: -1rem; white-space: nowrap;';

    elRef.appendChild(this.tooltip);
  }

  toggleTooltip(): void {
    this.tooltip.style.display = this.isVisible ? 'inherit' : 'none';
    this.isVisible = !this.isVisible;
  }
}
