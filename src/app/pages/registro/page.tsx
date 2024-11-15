"use client";

import { Form } from "@/components/form";
import { Registro } from "@/types/types";
import { useRouter } from "next/navigation";

export default function RegistroPage() {
    const navigation = useRouter();
    const fields = [
        { label: "Nome", name: "nome", type: "text", placeholder: "Digite seu nome", required: true },
        { label: "Email", name: "email", type: "email", placeholder: "Digite seu email", required: true },
        { label: "CPF", name: "cpf", type: "text", placeholder: "Digite seu CPF", required: true },
        { label: "Data de Nascimento", name: "dataNascimento", type: "date", required: true },
        { label: "Telefone", name: "telefone", type: "tel", placeholder: "Digite seu telefone", required: true },
        { label: "CEP", name: "cep", type: "text", placeholder: "Digite seu CEP", required: true },
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
