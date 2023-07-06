import { TarefaStatus } from "src/app/shared/app.constants";

export class TarefaRetornoDto{

    public idTarefa: number;
    public descricao: string;
    public prazoEntrega: Date;
    public tarefaStatus: TarefaStatus;
    public tarefaAtrasada: boolean;
    public email: string;
}