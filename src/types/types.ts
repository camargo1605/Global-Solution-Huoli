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
    id?: number;
    id_cliente: number;
    nome: string;
    marca: string;
    modelo: string;
    potencia: number;
    voltagem: string;
    dt_registro: string;
    tempo_uso: number;
    custo_estimado: number;
};


export type ConfiguracaoConsumo = {
    id_eletrodomestico: number;
    limite_consumo: number;
    acao_apos_limite: string;
};