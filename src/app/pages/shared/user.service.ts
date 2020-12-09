import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { UserInterfaceI } from '../shared/user-interface.model';

@Injectable({
  providedIn: 'root'
})
export class UserInterfaceService {

  userInterface: UserInterfaceI = {
    matDrawer: true,
  };

  constructor() {}

  toggleSideNav() {
    this.userInterface.matDrawer = !this.userInterface.matDrawer;    
  }
}