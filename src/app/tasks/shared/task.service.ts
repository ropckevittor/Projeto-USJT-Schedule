import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Task } from './task';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private db: AngularFireDatabase) { }


  createTask(task: Task) {
    // ACESSA O NÓ DA TASK E PUXA A TASK QUE ACABOU DE INCLUIR
    this.db.list('task').push(task)
    .then((result: any) => {
      console.log(result.key);
    });

  }

  updateTask(task: Task, key: string){
    this.db.list('task').update(key,task)
    .catch((error: any) => {
      console.error(error);
    });
  }
  

  deleteTask(key: string) {
    // ACESSANDO O CONTATO PELA KEY E EXCLUINDO
    this.db.object(`task/${key}`).remove();

  }
  

  getAll() {
    // ACESSA A LISTA/ PEGA AS MUDANÇAS/ EXECUTA O MAPEAMENTO DAS MUDANÇAS/ 
    // RETORNA OS OBJETOS PARA A TELA COMEÇANDO COM A KEY E TRAZENDO TODOS OS OUTROS VALORES INSERIDOS (JSON)
    return this.db.list('task')
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {}}));
      })
    );
  }
}