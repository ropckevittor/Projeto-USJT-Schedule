import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {

  private taskSource= new BehaviorSubject ({ task: null, key: ''});
  currentTask = this.taskSource.asObservable();

  constructor() { }

  changeTask(task: Task, key: string) {
    this.taskSource.next({ task: task, key: key});
  }
}

