import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

// FIREBASE AUTHENTICATION
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './user.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({ 
  providedIn: 'root'
})

export class AuthService {

    user: Observable<User>;
     

  constructor(private afAuth: AngularFireAuth,
            private afs: AngularFirestore,
            private router: Router,
            ) { 
      
              this.afAuth.setPersistence("session");}

  

          // FIRESTORE //

         async login(email:string, password: string) {
            return this.afAuth.signInWithEmailAndPassword(email, password);
          }

          async logout() {
            return this.afAuth.signOut();
          }
          
          async signUp(email:string, password: string, first: string) {
            this.afAuth.createUserWithEmailAndPassword(email,password).then(result => {
              const newUser: User = {
                first,
                email,
                uid: result.user.uid
          };
          
        this.setUserData(newUser);
        
      });

    }

    setUserData(user:User) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

      return userRef.set(user, {
        merge: true
      });

}
}
  