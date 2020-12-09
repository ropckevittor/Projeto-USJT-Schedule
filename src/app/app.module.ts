import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

    //  COMPONENTES WEB
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AutenticacaoComponent } from './pages/home/autenticacao/autenticacao.component';
import { LoginComponent } from './pages/login/login.component';

// CONFIGURAÇÃO FIREBASE
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { ListTaskComponent } from './tasks/list-task/list-task.component';



// MATERIAL
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip'
import { FlexLayoutModule } from '@angular/flex-layout';
import {  MatDialogModule } from '@angular/material/dialog';
import {  MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list'
import { AuthGuard } from './pages/shared/auth.guard';
import { AuthService } from './pages/shared/auth.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DeleteDialogComponent } from './tasks/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './tasks/edit-dialog/edit-dialog.component';




@NgModule({
  declarations: [
   
    //// COMPONENTES ////
    AppComponent,

    //// COMPONENTES --TASKS ////
    EditTaskComponent,
    ListTaskComponent,

    //// COMPONENTES --LOGIN/HOME ////
    HomeComponent,
    AutenticacaoComponent,
    LoginComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    
    
    
    
    

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    
    //// MATERIAL ////

    MatDialogModule,
    MatTabsModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatInputModule,
    MatGridListModule,
    MatTooltipModule,
    MatSidenavModule,


    // (())
    HttpClientModule,
    
    // FIREBASE //
    AngularFireModule.initializeApp(environment.firebaseSDK),
    AngularFireDatabaseModule,

  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
