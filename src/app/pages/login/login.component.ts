import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

// ROTAS
import { Router } from '@angular/router';

// FIREBASE/AUTENTICACAO
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../shared/auth.service';
import { ContaService } from '../shared/conta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;
  
  

  constructor(private afAuth: AngularFireAuth,
              private snackBar: MatSnackBar,
              private authService: AuthService,
              private router: Router) {

    this.loginFormGroup = new FormGroup (
      {email: new FormControl(""), password: new FormControl("")},Validators.required);

    this.registerFormGroup = new FormGroup(
      {first: new FormControl(""),email: new FormControl(""),password: new FormControl(""),},Validators.required);}
      
     login() {
      if (this.loginFormGroup.valid) {
        this.authService.login(
        this.loginFormGroup.get("email").value,
        this.loginFormGroup.get("password").value
      ).then(result =>{
        if (result) {
          this.router.navigate([""]);
          this.snackBar.open("Bem Vindo(a)", null, {duration: 4000});
        }else{
          this.snackBar.open("Insira um login valido. Caso não seja um usuario, crie sua conta!", null, {duration: 4000});
        }
      }).catch(err => {
        this.snackBar.open("Insira um login valido. Caso não seja um usuario, crie sua conta!", null, {duration: 4000});
      });
    
    }
  }
    ngOnInit(): void {
      
    }
  
    async register() {
      if(this.registerFormGroup.valid) {
          this.authService.signUp(
          this.registerFormGroup.get("email").value,
          this.registerFormGroup.get("password").value,
          this.registerFormGroup.get("first").value
        ).then(result => {
          this.router.navigate(["new"]);
          this.snackBar.open("Conta criada com sucesso!!", null, {duration: 4000});
        }).catch(err => {
          this.snackBar.open("Unable to register", null, {duration: 4000});
        });

        
        }
      }
   }
   
    