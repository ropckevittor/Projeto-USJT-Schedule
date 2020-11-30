import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
  export class AuthGuard implements CanActivate {
    constructor(private router: Router,
    private afAuth: AngularFireAuth) { }
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this.afAuth.onAuthStateChanged) {
          return true;
        }else{
        console.log("acesso negado")
        this.router.navigate(['/login']);
        return false
      }
    }
  }

      /*const token = window.localStorage.getItem('token');
        if (token) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }      
    } 
}
*/
