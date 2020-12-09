import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

// ROTAS
import { Router } from '@angular/router';

// FIREBASE/AUTENTICACAO
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../shared/auth.service';
import { ContaService } from '../shared/conta.service';
import { User } from '../shared/user.model';
import { ErrorStateMatcher } from '@angular/material/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pwdHide = true;
  loading = false;

  constructor(private auth: AuthService, private route: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    const userData = this.auth.userData$;

    userData.subscribe(user => {
      if(user) {
        this.route.navigate([''])
      }
    });
    
  }

  onLogin(form: User) {
    this.loading = true;

    this.auth.loginByEmail(form)
      .then(res => {
        this.loading = false;
        this.route.navigate([''])
        
      })
      .catch(err => {
        this.loading = false;
        console.error(err)
      });
  }



private user$: User;
  matcher = new MyErrorStateMatcher();
  loading2 = false;

  

  registerForm = new FormGroup({
    first: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password1: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    password2: new FormControl('')
  }, {validators: this.checkPassword})

  
  registerUser(form: any) {
    this.loading = true;

    const userObj = {
      ...this.user$,
      first: form.first,
      email: form.email,
      password: form.password1,
      
    }

    this.auth.registerUser(userObj)
      .then(() => {
        this.loading2 = false;
        this.route.navigate(['']);

      }).catch(err => {
        this.loading = false;
        console.error(err);
        
      });
    
  }

  checkPassword(group: FormGroup) {
    let pass1 = group.get('password1').value;
    let pass2 = group.get('password2').value;

    return pass1 === pass2 ? null: {notSame: true}
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

/*
  
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
        this.authService.loginUser(
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
   
    */