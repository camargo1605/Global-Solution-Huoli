"use client";

import { Form } from "@/components/form";
import { Registro } from "@/types/types";
import { useRouter } from "next/navigation";

export default function RegistroPage() {
    const navigation = useRouter();
    const fields = [
        { label: "Nome", name: "nome", type: "text", placeholder: "Digite seu nome", required: true },
        { label: "Email", name: "email", type: "email", placeholder: "Digite seu email", required: true, pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$", title: "Digite um email válido, por exemplo: teste@email.com" },
        { label: "CPF", name: "cpf", type: "text", placeholder: "Digite seu CPF", required: true, pattern: "[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}", title: "Digite um CPF válido, por exemplo: 123.456.789-09" },
        { label: "Data de Nascimento", name: "dataNascimento", type: "date", required: true },
        { label: "Telefone", name: "telefone", type: "tel", placeholder: "Digite seu telefone", required: true, pattern: '^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$', title: 'Digite um telefone válido, por exemplo: (11) 94374-0709 ou 11943740709' },
        { label: "CEP", name: "cep", type: "text", placeholder: "Digite seu CEP", required: true, pattern: "[0-9]{5}-[0-9]{3}", title: "Digite um CEP válido, por exemplo: 12345-678" },
        { label: "Senha", name: "senha", type: "password", placeholder: "Digite sua senha", required: true },
        { label: "Confirme sua senha", name: "confirmarSenha", type: "password", placeholder: "Confirme sua senha", required: true },
    ];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data: Registro = {
            nome: formData.get('nome') as string,
            email: formData.get('email') as string,
            senha: formData.get('senha') as string,
            cpf: formData.get('cpf') as string,
            dataNascimento: formData.get('dataNascimento') as string,
            telefone: formData.get('telefone') as string,
            cep: formData.get('cep') as string,
        };

        console.log(data);
        navigation.push('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-700 to-blue-500  px-4">
            <div className="w-full max-w-lg p-8 rounded-lg">
                <Form fields={fields} onSubmit={handleSubmit} buttonText="Registrar-se" />
            </div>
        </div>
    );
}
