import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./components/template/footer/footer.component";
import { HeaderComponent } from "./components/template/header/header.component";
import { NavComponent } from "./components/template/nav/nav.component";
import { HomeComponent } from "./components/template/views/home/home.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginReadComponent } from './components/template/views/login/login-read/login-read.component';
import { TodoReadComponent } from './components/template/views/todo/todo-read/todo-read.component';
import { UsuarioCreateComponent } from './components/template/views/usuario/usuario-create/usuario-create.component';
import { UsuarioReadComponent } from './components/template/views/usuario/usuario-read/usuario-read.component';
import { MatSortModule } from "@angular/material/sort";
import { MatSelect, MatSelectModule } from "@angular/material/select";
import { TodoUsuarioReadComponent } from './components/template/views/todo/todo-usuario-read/todo-usuario-read.component';
import { TodoCreateComponent } from './components/template/views/todo/todo-create/todo-create.component';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';

import { authConfig } from './auth/auth.config'; 
import { AuthService } from "./service/auth.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    LoginReadComponent,
    TodoReadComponent,
    UsuarioCreateComponent,
    UsuarioReadComponent,
    TodoUsuarioReadComponent,
    TodoCreateComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    OAuthModule.forRoot(),
    HttpClientModule
    
  ],
  providers: [
   ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private oauthService: OAuthService) {
    this.configureOAuth();  
  }

  private configureOAuth() {
    this.oauthService.configure(authConfig);
    
    
  }
 }
