import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: [ './frame.component.scss' ]
})
export class FrameComponent {

  @ViewChild('wrapper') wrapperRef!: ElementRef;

  @ViewChild('topBar') topBarRef!: ElementRef;

  position: { x: number, y: number } = { x: 100, y: 100 };

  size: { w: number, h: number } = { w: 200, h: 200 };

  lastPosition: { x: number, y: number };

  lastSize: { w: number, h: number };

  minSize: { w: number, h: number } = { w: 200, h: 200 };

  constructor(@Inject(DOCUMENT) private _document: Document,
              private _el: ElementRef) { }

  startDrag($event): void {
    $event.preventDefault();
    const mouseX = $event.clientX;
    const mouseY = $event.clientY;

    const positionX = this.position.x;
    const positionY = this.position.y;

    const duringDrag = (e) => {
      const dx = e.clientX - mouseX;
      const dy = e.clientY - mouseY;
      this.position.x = positionX + dx;
      this.position.y = positionY + dy;
      this.lastPosition = { ...this.position };
    };

    const finishDrag = (e) => {
      this._document.removeEventListener('mousemove', duringDrag);
      this._document.removeEventListener('mouseup', finishDrag);
    };

    this._document.addEventListener('mousemove', duringDrag);
    this._document.addEventListener('mouseup', finishDrag);
  }
}
