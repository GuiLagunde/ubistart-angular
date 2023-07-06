import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../environment/environment';
import { TarefaCadastraDto } from '../model/dto/tarefaCadastraDto.model';
import { TarefaStatus } from '../shared/app.constants';
import { TarefaRetornoDto } from '../model/dto/tarefaRetornoDto.model';
import { TarefaAtualizarDto } from '../model/dto/tarefaAtualizarDto.model';
import { AuthService } from './auth.service';
import { UsuarioService } from './usuario.service';
import { Tarefa } from '../model/tarefa.model';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  baseUrl: string = environment.baseUrl
  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${this.authService.getToken()}`
  //   })
  // };
 
  constructor(private http: HttpClient,
              private _snack: MatSnackBar,
              private authService: AuthService,
              private usuarioService: UsuarioService) { }

public createTarefa(tarefaCadastraDto: TarefaCadastraDto): Observable<TarefaCadastraDto>{
  const token = this.authService.getToken(); 
     
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
        
    const url = `${this.baseUrl}/tarefa`;
    return this.http.post<TarefaCadastraDto>(url, tarefaCadastraDto,{headers})
  }

 public updateStatus(idTarefa: number, tarefaStatus: TarefaStatus): Observable<TarefaCadastraDto> {
    const url = `${this.baseUrl}/tarefa/${idTarefa}`;
    const token = this.authService.getToken();      
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    const options = {
      headers,
      params: { tarefaStatus: tarefaStatus.toString() }
    };
    return this.http.patch<TarefaCadastraDto>(url, null, options);
  }
  

  update(idTarefa: number,tarefaAtualizarDto: TarefaAtualizarDto ): Observable<TarefaRetornoDto>{
    const url = `${this.baseUrl}/tarefa/${idTarefa}`
    const token = this.authService.getToken(); 
     
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.put<TarefaRetornoDto>(url, tarefaAtualizarDto,{headers})
  }
  

  findByUser(idUsuario: number):Observable<TarefaRetornoDto[]>{
    const url = `${this.baseUrl}/tarefa/${idUsuario}`
    const token = this.authService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<TarefaRetornoDto[]>(url,{headers})
  }

  findAll(tarefaAtrasada: boolean): Observable<TarefaRetornoDto[]> {
    const token = this.authService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    
    
    
    const url = `${this.baseUrl}/tarefa/admin?tarefaAtrasada=${tarefaAtrasada}`
    
    return this.http.get<TarefaRetornoDto[]>(url,{headers})
  }

  mensagem(str : string): void {
    this._snack.open(`${str}`, 'OK',{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }

  
}
