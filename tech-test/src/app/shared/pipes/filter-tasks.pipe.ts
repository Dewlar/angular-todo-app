import {Pipe, PipeTransform} from '@angular/core';
import {ITaskModel} from '../models';

@Pipe({
  name: 'filterTasks'
})
export class FilterTasksPipe implements PipeTransform {

  transform(tasks: ITaskModel[], search: string, category: string): ITaskModel[] {
    if (category === 'all') { category = ''; }
    if (category === '' && search === '') {
      return tasks;
    }
    return tasks
      .filter(task =>
        (task.label.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase()))
        && task.category.toLowerCase().includes(category.toLowerCase()));
  }

}
