import {Component, Inject, OnInit} from '@angular/core';
import {CategoryEnum} from '../../enums';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ITaskModel} from '../../models';

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.scss']
})
export class TaskEditorComponent implements OnInit {
  categoryList = Object.values(CategoryEnum);
  form: FormGroup;
  labelControl = new FormControl(
    '',
    [Validators.required, Validators.maxLength(20)]);
  categoryControl = new FormControl(
    '',
    [Validators.required]);
  descriptionControl = new FormControl(
    '',
    [Validators.required, Validators.minLength(1)]);
  task: ITaskModel;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskEditorComponent>,
    @Inject(MAT_DIALOG_DATA) data: ITaskModel,
  ) {
    this.task = data;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      label: this.labelControl,
      category: this.categoryControl,
      description: this.descriptionControl
    });
    if (this.task) {
      this.form.setValue({
        label: this.task.label,
        category: this.task.category,
        description: this.task.description,
      });
    }
  }

  onApplyClick() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
