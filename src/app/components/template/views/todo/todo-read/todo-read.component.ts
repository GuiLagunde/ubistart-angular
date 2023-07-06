import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TarefaRetornoDto } from 'src/app/model/dto/tarefaRetornoDto.model';
import { TarefaService } from 'src/app/service/tarefa.service';

@Component({
  selector: 'app-todo-read',
  templateUrl: './todo-read.component.html',
  styleUrls: ['./todo-read.component.css'],
})
export class TodoReadComponent implements OnInit {
  dataSource: MatTableDataSource<TarefaRetornoDto>;
  displayedColumns: string[] = ['descricao', 'prazoEntrega', 'tarefaStatus', 'email', 'idTarefa'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tarefaAtrasad: boolean;

  public formularioFiltros: FormGroup = new FormGroup({
    'tarefaAtrasada': new FormControl(false)
  });

  constructor(private tarefaService: TarefaService) {}
  
  ngOnInit() {
   
  }

  onSubmit() {
    // Obtendo o valor selecionado do mat-select
    const valorTarefaAtrasada = this.formularioFiltros.get('tarefaAtrasada').value;
        
    this.tarefaAtrasad = valorTarefaAtrasada;
        
  }

  carregarTarefas(): void {
     // Obtenha o valor atualizado do formulário antes de carregar as tarefas
  
    this.tarefaService.findAll(false).subscribe(
      (tarefas: any) => {
        if (Array.isArray(tarefas.content)) {
          this.dataSource = new MatTableDataSource<TarefaRetornoDto>(tarefas.content);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } 
      },
      error => {
          
      }
    );
  }
  

  filtrarTarefas(): void {
    this.carregarTarefas();
  }
  
  
  }

