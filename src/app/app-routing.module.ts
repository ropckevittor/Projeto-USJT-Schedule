import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// COMPONENTES
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { ListTaskComponent } from './tasks/list-task/list-task.component';
import { AutenticacaoComponent } from './pages/home/autenticacao/autenticacao.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

// AUTHGUARD -- CanActive
import { AuthGuard } from './pages/shared/auth.guard';
import { AngularFireAuthGuard, canActivate, redirectLoggedInTo, redirectUnauthorizedTo,  } from '@angular/fire/auth-guard';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToDashboard = redirectLoggedInTo(['']);
const redirectToDashboardWithLogger = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) =>
  pipe(
    tap(() => console.info('redirecionando')),
    redirectToDashboard
  );

const routes: Routes = [

  {path: 'login', component: LoginComponent,...canActivate(redirectToDashboardWithLogger),
  }, 

  
  {path: '', component: HomeComponent,
    children : [
      
      {path: '', component: ListTaskComponent, ...canActivate(redirectUnauthorizedToLogin),},
      {path: 'new', component: EditTaskComponent,  },
      
    ],
    
  },

  
];
  
    /*{  path: '',  component: HomeComponent,
    children : [
      
      {path: '', component: ListTaskComponent },
      {path: 'new', component: EditTaskComponent },
    
],
canActivate: [AuthGuard]
},
{
  path: '',
  component: AutenticacaoComponent,
  children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent }
    
]
},
];*/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

