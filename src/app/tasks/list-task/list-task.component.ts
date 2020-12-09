import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
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
  key: string;
  

  constructor(
    private taskService: TaskService,
    private taskDataService: TaskDataService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  
  ngOnInit() {
    this.tasks = this.taskService.getAll();
  }

  
  updateTask(task: Task, key: string) {
    this.taskDataService.changeTask(task, key);
  }

  openDeleteDialog(key: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteTask(this.key);
      }
      
    });
  
  }

  private deleteTask(key: string) {
      this.taskService.deleteTask(key);
  
  }
}