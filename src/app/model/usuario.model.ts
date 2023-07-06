import {UsuarioRole } from "../shared/app.constants";

export class Usuario{

    public idUsuario: number;
    public senha: string;
    public email: string;
    public usuarioRole: UsuarioRole;
    public deletado: boolean;
    public dataCriacao: Date;
    public dataAtualizacao: Date;
}
