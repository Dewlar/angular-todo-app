import { CategoryEnum } from '../enums';

export interface ITaskModel {
  id: number;
  label: string;
  description: string;
  category: CategoryEnum;
  done: boolean | string;
}

export interface IConfirmationDialog {
  title: string;
  content: string;
  cancel: string;
  apply: string;
}
