import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../environment/environment';
import { UsuarioDto } from '../model/dto/usuarioDto.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
  
})
export class UsuarioService {
  baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private _snack: MatSnackBar,
    private authService: AuthService
  ) {}

  

  create(usuarioDto: UsuarioDto): Observable<UsuarioDto> {
    const url = `${this.baseUrl}/usuario`
    
    return this.http.post<UsuarioDto>(url,usuarioDto);
  }
  
  

  mensagem(str: string): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
