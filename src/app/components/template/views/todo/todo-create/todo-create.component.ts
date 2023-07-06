import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TarefaCadastraDto } from 'src/app/model/dto/tarefaCadastraDto.model';
import { Tarefa } from 'src/app/model/tarefa.model';
import { AuthService } from 'src/app/service/auth.service';
import { TarefaService } from 'src/app/service/tarefa.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
  providers:[]
})
export class TodoCreateComponent {
  tarefaCadastraDto: TarefaCadastraDto =  new TarefaCadastraDto();
 

  public formularioTarefa: FormGroup = new FormGroup({
    'descricao': new FormControl(null, [Validators.required]),
    'prazoEntrega': new FormControl(null,[Validators.required])
  });

  constructor(
    private tarefaService: TarefaService,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) {
    
  }

  private getDataFormulario(): Tarefa{
     
    const objectTarefa = new Tarefa;
    objectTarefa.descricao = this.formularioTarefa.value.descricao;
    objectTarefa.prazoEntrega = this.formularioTarefa.value.prazoEntrega;
           
    return objectTarefa;
  }

  public onSubmit() {
    this.formularioTarefa.updateValueAndValidity();

    if (this.formularioTarefa.status === 'INVALID') {
      this.formularioTarefa.get('descricao').markAsTouched();
      this.formularioTarefa.get('prazoEntrega').markAsTouched();
      
      this.tarefaService.mensagem("O Cadastro não foi preenchido corretamente. Verifique!");
    } else { // Form is Valid
      
      
     this.tarefaCadastraDto.descricao = this.getDataFormulario().descricao;
     this.tarefaCadastraDto.prazoEntrega = this.getDataFormulario().prazoEntrega;
     this.tarefaCadastraDto.idUsuario = this.authService.getIdUser()
         
     this.tarefaService.createTarefa(this.tarefaCadastraDto).subscribe(
        (response: any) => {
          
          this.tarefaService.mensagem("Criado com Sucesso!")   
          this.router.navigate(['todo-usuario']);
           
        },
        error => {
                
            
        }
      );
    }
  } 

}
