import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {ITaskModel} from '../../models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  checkIcon: string;
  @Input() task: ITaskModel;
  @Output() deleteClick = new EventEmitter();
  @Output() editClick = new EventEmitter();
  @Output() doneClick = new EventEmitter();

  @HostBinding('class') get classes() {
    return this.task.done ? 'done' : '';
  }

  constructor() {
  }

  ngOnInit(): void {
    this.checkIcon = this.task.done ?  '' : '_outlined';
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
}
