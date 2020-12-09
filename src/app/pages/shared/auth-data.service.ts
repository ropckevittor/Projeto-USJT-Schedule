import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthDataService {

  private userSource= new BehaviorSubject ({ user: null, key: ''});
  currentTask = this.userSource.asObservable();

  constructor() { }

  changeUser(user: User, key: string) {
    this.userSource.next({ user: user, key: key});
  }
}