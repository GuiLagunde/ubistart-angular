import { EventEmitter, Injectable } from '@angular/core';
import { OAuthService} from 'angular-oauth2-oidc';
import { authConfig } from '../auth/auth.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  showMenuEmmiter = new EventEmitter<boolean>();
  constructor(
    private oauthService: OAuthService,
    private http: HttpClient
  ) {
    this.configureOAuth();
  }

  private configureOAuth() {
    this.oauthService.configure(authConfig);
    
    
  }

  // login(email: string, senha: string): Observable<any> {
  //   return this.http.post('http://localhost:8080/api/auth', { login: email, senha });
  // }
  login(login: string, senha: string): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth', { login, senha }).pipe(
      tap((response: any) => {
        const token = response.token;
        const email = response.login;
        const id = response.id; 
        const isadmin = response.admin;// Supondo que o token é retornado como 'access_token' na resposta
        localStorage.setItem('token', token);
        localStorage.setItem('email',email)
        localStorage.setItem('id',id)
        localStorage.setItem('admin',isadmin)
      })
    );
  }

  

  public getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json;charset=UTF-8');
  
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  }
  
  
  
  getEmail(){
    return localStorage.getItem('email');
  }

  logout() {
    this.oauthService.logOut();
  }

  getAccessToken(): string {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null ? true : false;
  }
  

  showMenu(show : boolean){
    if(show){
      return this.showMenuEmmiter.emit(true)
    }else{
      return this.showMenuEmmiter.emit(false)
    }

  }

  getToken(): string {
   let token = localStorage.getItem('token').toString(); 
      
    return token;
    
  }
  getIdUser():number{
    let id = parseInt( localStorage.getItem('id'));
    return id;
  }

  isAdmin(): boolean{
    let isAdmin = localStorage.getItem('admin');
    return isAdmin === 'true' ? true : false;

  }
  
}
