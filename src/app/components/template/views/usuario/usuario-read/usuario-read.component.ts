import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/service/usuario.service';


@Component({
  selector: 'app-usuario-read',
  templateUrl: './usuario-read.component.html',
  styleUrls: ['./usuario-read.component.css'],
  providers:[UsuarioService]
})
export class UsuarioReadComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario>;
  displayedColumns: string[] = ['id', 'nome', 'email','tipo'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  usuario: Usuario = new Usuario();

  ngOnInit() {
    

    // Inicializando o DataSource com os dados dos usuários
    this.dataSource = new MatTableDataSource();

    // Vinculando o paginator e sort ao DataSource
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
