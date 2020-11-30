import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  constructor() { }

  login(usuario: any) {
    //simulando usuario com promise
    
    return new Promise((resolve) => {
      window.localStorage.setItem('token', 'usuario-token');
      resolve(true);
    })
  }

  criarConta(conta:any) {
    return new Promise((resolve) => {
      window.localStorage.setItem('token', 'usuario-token');
      resolve(true);
    })
  }
}

