import {Component, Inject, OnInit} from '@angular/core';
import {CategoryEnum} from '../../enums';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ITaskModel} from '../../models';

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.scss']
})
export class TaskEditorComponent implements OnInit {
  categoryList = Object.values(CategoryEnum);
  form = new FormGroup({
    label: new FormControl('', [Validators.required, Validators.minLength(1)]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });
  task: ITaskModel;
  formErr = false;

  constructor(
    public dialogRef: MatDialogRef<TaskEditorComponent>,
    @Inject(MAT_DIALOG_DATA) data: ITaskModel,
  ) {
    this.task = data;
  }

  ngOnInit(): void {
    if (this.task) {
      this.form.setValue({
        label: this.task.label,
        category: this.task.category,
        description: this.task.description,
      });
    }
  }

  get label() {
    return this.form.get('label');
  }
  get category() {
    return this.form.get('category');
  }
  get description() {
    return this.form.get('description');
  }

  onApplyClick() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      this.formErr = true;
    }
  }

  // onCancelClick() {
    // this.dialogRef.close();
  // }
}
