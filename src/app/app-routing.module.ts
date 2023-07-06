import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/template/views/home/home.component';
import { LoginReadComponent } from './components/template/views/login/login-read/login-read.component';
import { TodoReadComponent } from './components/template/views/todo/todo-read/todo-read.component';
import { UsuarioCreateComponent } from './components/template/views/usuario/usuario-create/usuario-create.component';
import { UsuarioReadComponent } from './components/template/views/usuario/usuario-read/usuario-read.component';
import { TodoUsuarioReadComponent } from './components/template/views/todo/todo-usuario-read/todo-usuario-read.component';
import { TodoCreateComponent } from './components/template/views/todo/todo-create/todo-create.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'home',component: HomeComponent,canActivate:[AuthGuard] },
  {path:'',component: LoginReadComponent },
  {path:'todo',component: TodoReadComponent,canActivate:[AuthGuard] },
  {path:'todo-usuario/create',component: TodoCreateComponent },
  {path:'todo-usuario',component: TodoUsuarioReadComponent,canActivate:[AuthGuard] },
  {path:'usuario/cadastro',component: UsuarioCreateComponent },
  {path:'usuario',component: UsuarioReadComponent,canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
