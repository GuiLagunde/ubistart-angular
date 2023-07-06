import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-login-read',
  templateUrl: './login-read.component.html',
  styleUrls: ['./login-read.component.css'],
  providers: [UsuarioService]
})
export class LoginReadComponent {
  constructor(private authService: AuthService,
     private route: ActivatedRoute,
      private router: Router,
      private usuarioService: UsuarioService
      ) {}

  public formularioLogin: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required]),
    'senha': new FormControl(null, [Validators.required])
  });

  private getDataFormulario() {
    return {
      login: this.formularioLogin.value.email,
      senha: this.formularioLogin.value.senha
    };
  }

  public onSubmit() {
    this.formularioLogin.updateValueAndValidity();
  
    if (this.formularioLogin.status === 'INVALID') {
      this.authService.showMenu(false)
      // O formulário é inválido, faça algo (exiba uma mensagem de erro, etc.)
    } else { // O formulário é válido
      const { login, senha } = this.getDataFormulario();
      
      this.authService.login(login, senha).subscribe((response: any) =>{
           // Login successful
           this.usuarioService.mensagem("Login efetuado com Sucesso!");
           this.authService.showMenu(true)
           
             this.router.navigate(['/home']); // Redireciona para a rota '/home'
           
      })
    }
  }
}
