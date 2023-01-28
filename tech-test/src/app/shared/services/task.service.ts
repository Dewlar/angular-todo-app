import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITaskModel} from '../models';
import {environment} from '../../../environments/environment';
import {CategoryEnum} from '../enums';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  getList(): Observable<ITaskModel[]> {
    return this.http.get<ITaskModel[]>(`${environment.apiUrl}/tasks`);
  }

  createTask(task: { label: string, description: string, category: CategoryEnum, done: string | boolean }): Observable<ITaskModel> {
    return this.http.post<ITaskModel>(`${environment.apiUrl}/tasks`, task);
  }

  editTask(task: ITaskModel): Observable<ITaskModel> {
    return this.http.patch<ITaskModel>(`${environment.apiUrl}/tasks/${task.id}`, task);
  }

  deleteTask(task: ITaskModel): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/tasks/${task.id}`);
  }
}
