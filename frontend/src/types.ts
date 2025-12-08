export interface Task {
  id: number;
  titulo: string;
  detalhes: {
    prioridade: 'alta' | 'media' | 'baixa';
    descricao: string;
    criado_em: string;
  };
}

export type Priority = 'alta' | 'media' | 'baixa';
