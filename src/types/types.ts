export type FormField = {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    required?: boolean;
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