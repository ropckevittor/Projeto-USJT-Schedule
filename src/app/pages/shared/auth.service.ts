import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

// FIREBASE AUTHENTICATION
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './user.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({ 
  providedIn: 'root'
})

export class AuthService {

 public userData$: Observable<firebase.default.User>;
 

  constructor(
    private afAuth: AngularFireAuth,
    private storage: AngularFirestore
  ) {
    this.userData$ = afAuth.authState;
  }
  

  loginByEmail(user: User) {
    const {email, password} = user;
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.signOut();
  }

  registerUser(user: User,) {
    const {email, password} = user;
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  preSaveUserProfile(user: User, ): void {
    if(user) {
     
      this.saveUserProfile(user);
    }
  }

  private saveUserProfile (user) {
    const u = this.afAuth.currentUser;

    u.then(userData => {
      userData.updateProfile(user);
      
    }).catch(err => {
      console.error(err);
      
    });
  }

  

}



/*
  user: Observable<User>;

    
    public userData$: Observable<firebase.default.User>;
    private filePath: string;

  constructor(private afAuth: AngularFireAuth,
            private storage: AngularFirestore,
            private router: Router,
            ) { 
      
              this.userData$ = afAuth.authState;}

  

          // FIRESTORE //

         async loginUser(email:string, password: string) {
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
                password,
                uid: result.user.uid
          };
          
        this.setUserData(newUser);
        
      });

    }

    setUserData(user:User) {
      const userRef: AngularFirestoreDocument<User> = this.storage.doc(`users/${user.uid}`);

      return userRef.set(user, {
        merge: true
      });

}
}


*/
