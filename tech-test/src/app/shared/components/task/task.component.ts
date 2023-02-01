import {Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';
import {ITaskModel} from '../../models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  checkIcon: string;
  previewDescription: string;
  isExpanded = false;
  expandIcon = 'expand_more';
  maxLengthOfDescription = 160;
  @Input() task: ITaskModel;
  @Output() deleteClick = new EventEmitter();
  @Output() editClick = new EventEmitter();
  @Output() doneClick = new EventEmitter();
  @HostListener('mouseleave') close() {
    if (this.previewDescription.length > this.maxLengthOfDescription + 3) {
      this.expandTask();
    }
  }

  @HostBinding('class') get classes() {
    return this.task.done ? 'done' : '';
  }

  constructor() {
  }

  ngOnInit(): void {
    this.checkIcon = this.task.done ?  '' : '_outlined';
    if (this.task.description.length > this.maxLengthOfDescription) {
      this.previewDescription = this.task.description.slice(0, this.maxLengthOfDescription) + '...';
      this.isExpanded = true;
    } else {
      this.previewDescription = this.task.description;
      this.isExpanded = false;
    }
  }

  onDeleteButtonClick() {
    this.deleteClick.emit();
  }

  onEditButtonClick() {
    this.editClick.emit();
  }

  onDoneClick() {
    this.doneClick.emit();
  }

  expandTask() {
    this.previewDescription = this.previewDescription.length < this.task.description.length
      ? this.task.description
      : this.task.description.slice(0, this.maxLengthOfDescription) + '...';
    this.expandIcon = this.expandIcon === 'expand_more' ? 'expand_less' : 'expand_more';
  }
}
