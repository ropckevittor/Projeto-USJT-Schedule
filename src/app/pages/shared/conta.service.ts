import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from './user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

 
  constructor(private db: AngularFireDatabase) { }


  createUser(user: User) {
    // ACESSA O NÓ DA TASK E PUXA A TASK QUE ACABOU DE INCLUIR
    this.db.list('users').push(user)
    .then((result: any) => {
      console.log(result.key);
    });

  }

  updateUser(user: User, key: string){
    this.db.list('users').update(key,user)
    .catch((error: any) => {
      console.error(error);
    });
  }
  

  deleteUser(key: string) {
    // ACESSANDO O CONTATO PELA KEY E EXCLUINDO
    this.db.object(`users/${key}`).remove();

  }
  

  getAllUsers() {
    // ACESSA A LISTA/ PEGA AS MUDANÇAS/ EXECUTA O MAPEAMENTO DAS MUDANÇAS/ 
    // RETORNA OS OBJETOS PARA A TELA COMEÇANDO COM A KEY E TRAZENDO TODOS OS OUTROS VALORES INSERIDOS (JSON)
    return this.db.list('users')
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {}}));
      })
    );
  } 
}