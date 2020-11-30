import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../shared/task';
import { TaskDataService } from '../shared/task-data.service';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {


  tasks: Observable<any>;

  constructor(
    private taskService: TaskService,
    private taskDataService: TaskDataService
  ) { }

  
  ngOnInit() {
    this.tasks = this.taskService.getAll();
  }

  deleteTask(key: string) {
    this.taskService.deleteTask(key);
  }

  updateTask(task: Task, key: string) {
    this.taskDataService.changeTask(task, key);
  }
}