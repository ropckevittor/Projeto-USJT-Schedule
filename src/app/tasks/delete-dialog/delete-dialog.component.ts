import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/task';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  
tasks: Task;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }


    deleteTask(key: string) {
      this.taskService.deleteTask(key);
    }
  }

