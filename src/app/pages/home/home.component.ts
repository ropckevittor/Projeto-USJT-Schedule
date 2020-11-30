import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
    
    ) { }
    
    async logout() {
      this.afAuth.signOut().then(() => this.router.navigate(['login']));
      this.snackBar.open("Até a proxima! =]", null, {duration: 4000});    }
    
  ngOnInit(): void {
  }

}
