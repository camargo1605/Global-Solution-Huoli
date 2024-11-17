export type FormField = {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    required?: boolean;
    pattern?: string;
    title?: string;
};

export type Registro = {
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    dataNascimento: string;
    telefone: string;
    cep: string;
};

export type Login = {
    email: string;
    senha: string;
};

export type Eletrodomestico = {
    idEletrodomestico?: number;
    idCliente?: number;
    nome: string;
    marca: string;
    modelo: string;
    potencia: number;
    voltagem: string;
    tempoUso: number;
    custoEstimado: number;
};


export type ConfiguracaoConsumo = {
    idEletrodomestico: number;
    limiteConsumo: number;
    acaoAposLimite: string;
};