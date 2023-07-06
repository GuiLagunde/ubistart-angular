import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TarefaRetornoDto } from 'src/app/model/dto/tarefaRetornoDto.model';
import { AuthService } from 'src/app/service/auth.service';
import { TarefaService } from 'src/app/service/tarefa.service';

@Component({
  selector: 'app-todo-usuario-read',
  templateUrl: './todo-usuario-read.component.html',
  styleUrls: ['./todo-usuario-read.component.css'],
  providers:[TarefaService]
})
export class TodoUsuarioReadComponent implements OnInit {
  dataSource: MatTableDataSource<TarefaRetornoDto>;
  displayedColumns: string[] = ['descricao', 'prazoEntrega', 'tarefaStatus', 'idTarefa','acoes'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tarefaAtrasada: boolean;

 constructor(private tarefaService: TarefaService,
              private authService: AuthService) {}
  
    ngOnInit(): void {
    
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.tarefaService.findByUser(this.authService.getIdUser()).subscribe(
      (tarefas: any) => {
        if (Array.isArray(tarefas) && tarefas != undefined) {
          this.dataSource = new MatTableDataSource<TarefaRetornoDto>(tarefas);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }else{
          this.dataSource = new MatTableDataSource<TarefaRetornoDto>([])
        } 

      },
      error => {
          for(let i = 0; i < error.error.erros.length; i++){
          this.tarefaService.mensagem(error.error.erros[i])
        }
      }
    );
  }  
  
  }
  


