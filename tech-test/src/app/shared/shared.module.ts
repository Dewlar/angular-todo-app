import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTasksPipe } from './pipes/filter-tasks.pipe';
import { TaskConfirmationDialogComponent } from './components/task-confirmation-dialog/task-confirmation-dialog.component';
import { TaskEditorComponent } from './components/task-editor/task-editor.component';
import { TaskComponent } from './components/task/task.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DragDropReceiverComponent } from './components/drag-drop-receiver/drag-drop-receiver.component';

@NgModule({
  declarations: [
    FilterTasksPipe,
    TaskConfirmationDialogComponent,
    TaskEditorComponent,
    TaskComponent,
    DragDropReceiverComponent,
  ],
  exports: [
    FilterTasksPipe,
    TaskConfirmationDialogComponent,
    TaskEditorComponent,
    TaskComponent,
    DragDropReceiverComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
