import { TarefaStatus } from "../shared/app.constants";
import { Usuario } from "./usuario.model";

export class Tarefa{

    public idTarefa: number;
    public descricao: string;
    public prazoEntrega: Date;
    public dataFinalizado: Date;
    public tarefaStatus:TarefaStatus;
    public usuario: Usuario;
    public num: string; 
}