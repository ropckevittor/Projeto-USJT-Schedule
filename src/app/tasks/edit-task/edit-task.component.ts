import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../shared/task';
import { TaskDataService } from '../shared/task-data.service';
import { TaskService } from '../shared/task.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  task: Task  
  key: string = '' ;

  constructor (private taskService: TaskService, private taskDataService: TaskDataService) { }
    
  
  ngOnInit() {
  this.task = new Task();
  
    this.taskDataService.currentTask.subscribe(data => {

      if (data.task && data.key) {
        this.task = new Task();
        this.task.name = data.task.name;
        this.task.dateinicial = data.task.dateinicial;
        this.task.datefinal = data.task.datefinal;
        this.task.description = data.task.description;
        
        this.key = data.key;
      }
    });
    
  };

  onSubmit() {
    
    // SE EXISTIR A CHAVE ENTAO VOU FAZER O UPDATE DA TASK. CASO CONTRARIO, VOU CRIAR UMA NOVA
    if(this.key) {
      this.taskService.updateTask(this.task, this.key)

    }else{
      this.taskService.createTask(this.task);

    }
    
      this.task = new Task();
      this.key = null;
      
  }

  
}