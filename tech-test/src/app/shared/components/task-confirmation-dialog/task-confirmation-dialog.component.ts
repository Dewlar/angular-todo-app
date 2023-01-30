import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IConfirmationDialog} from '../../models';

@Component({
  selector: 'app-task-confirmation-dialog',
  templateUrl: './task-confirmation-dialog.component.html',
  styleUrls: ['./task-confirmation-dialog.component.scss']
})
export class TaskConfirmationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TaskConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmationDialog,
  ) {
  }

  ngOnInit(): void {
  }

  onApplyClick() {
    this.dialogRef.close(true);
  }
}
