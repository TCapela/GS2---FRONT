export type UserType = {
    id: number;
    nome: string;
    email: string;
    senhaHash:string;
}

export type Simulacao = {
    id: number;
    tipoCliente: string;
    localizacao: string;
    custoMensal: number;
    orcamento: number;
    tipoEnergiaEscolhida: string;
    economiaAnual: number;
    custoInstalacaoRecomendada: number;
    tempoRetornoRecomendado: number;
  };