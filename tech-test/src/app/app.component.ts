import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {TaskService} from './shared/services';
import {ITaskModel} from './shared/models';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {TaskConfirmationDialogComponent} from './shared/components/task-confirmation-dialog/task-confirmation-dialog.component';
import {of} from 'rxjs';
import * as dayjs from 'dayjs';
import {TaskEditorComponent} from './shared/components/task-editor/task-editor.component';
import {CategoryEnum, CategoryEnumFilter} from './shared/enums';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  categoryList = Object.values(CategoryEnumFilter);
  selectedCategory = 'all';
  title = 'todo-app';
  term = '';
  taskList: ITaskModel[] = [];
  draggableTask: ITaskModel;
  isDragStarted = false;

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.getTaskList().subscribe();
  }

  private getTaskList() {
    return this.taskService.getList()
      .pipe(
        take(1),
        tap(list => {
          // this.taskList = list.sort( (task) => { if (task.done === false) { return -1; } else { return 1; }});
          this.taskList = list.reduce( (acc, val) => val.done ? acc : [...acc, val], []).concat(list.filter( task => task.done));
          this.cdr.detectChanges();
        })
      );
  }

  public addTask() {
    const dialogRef = this.dialog.open(TaskEditorComponent, {
      data: {},
    });

    dialogRef.afterClosed()
      .pipe(
        switchMap( data => {
          // if (data) {
            return this.taskService.createTask({
              label: data.label,
              description: data.description,
              category: data.category,
              done: false
            });
          // } else {
          //   return of({});
          // }
        }),
        switchMap(() => this.getTaskList())
      )
      .subscribe();
  }

  onEdit(task: ITaskModel) {
    if (task.done) { return this.onDone(task , 'continue'); }

    const dialogRef = this.dialog.open(TaskEditorComponent, {
      data: task
    });

    dialogRef.afterClosed()
      .pipe(
        switchMap( data => this.taskService.editTask({
          ...task,
          label: data.label,
          category: data.category,
          description: data.description
        })),
        switchMap( () => this.getTaskList())
      )
      .subscribe();
  }

  public onDelete(task: ITaskModel) {
    const dialogRef = this.dialog.open(TaskConfirmationDialogComponent, {
      data:
      {
        title: 'Delete Task',
        content: 'Do you really want to delete this task?',
        cancel: 'No',
        apply: 'Yes',
      },
    });

    dialogRef.afterClosed()
      .pipe(
        switchMap( confirmed => confirmed ? this.taskService.deleteTask(task) : of(false)),
        switchMap( () => this.getTaskList())
      )
      .subscribe();
  }

  onDone(task: ITaskModel, keepEdit?: string) {
    const dialogData = {
      done:
        {
          title: 'Done Task',
          content: 'Do you want to mark this task done?',
          cancel: 'No',
          apply: 'Yes',
        },
      unDone:
        {
          title: 'Undone Task',
          content: 'Do you want to continue this task?',
          cancel: 'No',
          apply: 'Yes',
        },
    };

    const dialogRef = this.dialog.open(TaskConfirmationDialogComponent, {
      data: task.done ? dialogData.unDone : dialogData.done
    });

    dialogRef.afterClosed()
      .pipe(
        switchMap( confirmed => {
          if (confirmed) {
            task.done = task.done ? false : dayjs().format('DD-MM-YYYY');
            return keepEdit ? of(this.onEdit(task)) : this.taskService.editTask(task);
          } else {
            return of(false);
          }
        }),
        switchMap( () => this.getTaskList())
      )
      .subscribe();
  }

  dragStarted(task: ITaskModel) {
    this.draggableTask = task;
    this.isDragStarted = true;
  }

  dropDone() {
    this.isDragStarted = false;
  }
}
