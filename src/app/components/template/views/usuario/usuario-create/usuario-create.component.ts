import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioDto } from 'src/app/model/dto/usuarioDto.model';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css'],
  providers: [UsuarioService]
})
export class UsuarioCreateComponent {
  usuarioDto: UsuarioDto = new UsuarioDto();

  public formularioUsuario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required]),
    'senha': new FormControl(null, [Validators.required])
  });

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    
  }
  
  private getDataFormulario(): UsuarioDto {
    const objectUsuario = new UsuarioDto();
    objectUsuario.email = this.formularioUsuario.value.email;
    objectUsuario.senha = this.formularioUsuario.value.senha;
    
    return objectUsuario;
  }

  public onSubmit() {
    this.formularioUsuario.updateValueAndValidity();

    if (this.formularioUsuario.status === 'INVALID') {
      this.formularioUsuario.get('email').markAsTouched();
      this.formularioUsuario.get('senha').markAsTouched();
      
      this.usuarioService.mensagem("O Cadastro não foi preenchido corretamente. Verifique!");
    } else { // Form is Valid
      this.usuarioService.create(this.getDataFormulario()).subscribe(
        (response: any) => {
          
          this.usuarioService.mensagem("Criado com Sucesso!")   
          this.router.navigate(['']);
           
        },
        error => {
                     
          for(let i = 0; i < error.error.erros.length; i++){
            this.usuarioService.mensagem(error.error.erros[i])
          }
            
        }
      );
    }
  }

 
  
}
