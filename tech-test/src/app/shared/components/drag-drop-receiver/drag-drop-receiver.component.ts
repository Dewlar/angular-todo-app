import {Component, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ITaskModel} from '../../models';

@Component({
  selector: 'app-drag-drop-receiver',
  templateUrl: './drag-drop-receiver.component.html',
  styleUrls: ['./drag-drop-receiver.component.scss']
})
export class DragDropReceiverComponent implements OnInit, OnChanges {
  @Input() draggableTask: ITaskModel;
  @Input() isDragStarted: boolean;
  @Output() dragDone = new EventEmitter();
  private top: string;
  private bottom: string;
  private height: string;
  componentTitle: string;
  @HostBinding('class') get classes() {
    return this.isDragStarted ? 'dragged' : '';  }
  @HostBinding('style.bottom') get getBottom() {
    return this.bottom;  }
  @HostBinding('style.top') get getTop() {
    return this.top;  }
  @HostBinding('style.height') get getHeight() {
    return this.height;  }
  @HostListener('mouseup') dragEnd() {
    this.dragDone.emit(this.draggableTask);
  }
  constructor() {  }

  ngOnInit(): void {  }

  ngOnChanges(): void {
    if (this.draggableTask.done) {
      this.bottom = '';
      this.top = '0';
      this.componentTitle = 'in progress';
    } else {
      this.bottom = '0';
      this.top = '';
      this.componentTitle = 'done';
    }
  }

}
