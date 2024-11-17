"use client";

import { Form } from "@/components/form";
import { Registro } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegistroPage() {
    const navigation = useRouter();

    // Estado do formulário para controlar os valores dos campos
    const [formData, setFormData] = useState<Registro>({
        nome: "",
        email: "",
        senha: "",
        cpf: "",
        dataNascimento: "",
        telefone: "",
        cep: "",
    });

    const fields = [
        { label: "Nome", name: "nome", type: "text", placeholder: "Digite seu nome", required: true },
        { label: "Email", name: "email", type: "email", placeholder: "Digite seu email", required: true, pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$", title: "Digite um email válido, por exemplo: teste@email.com" },
        { label: "CPF", name: "cpf", type: "text", placeholder: "Digite seu CPF", required: true, pattern: "[0-9]{11}", title: "Digite um CPF válido, por exemplo: 12345678901" },
        { label: "Data de Nascimento", name: "dataNascimento", type: "date", required: true },
        { label: "Telefone", name: "telefone", type: "tel", placeholder: "Digite seu telefone", required: true, pattern: "^\\(?\\d{2}\\)?\\s?\\d{4,5}-?\\d{4}$", title: 'Digite um telefone válido, por exemplo: (11) 94374-0709 ou 11943740709' },
        { label: "CEP", name: "cep", type: "text", placeholder: "Digite seu CEP", required: true, pattern: "[0-9]{8}", title: "Digite um CEP válido, por exemplo: 12345678" },
        { label: "Senha", name: "senha", type: "password", placeholder: "Digite sua senha", required: true },
        { label: "Confirme sua senha", name: "confirmarSenha", type: "password", placeholder: "Confirme sua senha", required: true },
    ];

    // Manipulador de eventos para atualizar o estado do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data: Registro = {
            nome: formData.nome,
            email: formData.email,
            senha: formData.senha,
            cpf: formData.cpf,
            dataNascimento: formData.dataNascimento,
            telefone: formData.telefone,
            cep: formData.cep,
        };

        try {
            const response = await fetch("http://localhost:8080/clientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Erro ao registrar cliente");
            }

            alert("Registro realizado com sucesso!");
            navigation.push('/pages/login');
        } catch (error) {
            console.error("Erro ao registrar cliente:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-700 to-blue-500 px-4">
            <div className="w-full max-w-lg p-8 rounded-lg">
                <Form fields={fields} onSubmit={handleSubmit} onChange={handleChange} values={formData} buttonText="Registrar-se" />
            </div>
        </div>
    );
}
