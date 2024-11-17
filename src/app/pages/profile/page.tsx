"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/components/form";
import { Registro } from "@/types/types";

export default function MeuPerfilPage() {
    const navigation = useRouter();
    const [formData, setFormData] = useState<Registro | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Carregar informações do usuário ao montar o componente
    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            navigation.push("/pages/login");
            return;
        }

        // Buscar informações do cliente usando o email
        fetch(`http://localhost:8080/cliente/${email}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar informações do cliente:", error);
                setIsLoading(false);
            });
    }, [navigation]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (formData) {
            setFormData((prev) => ({
                ...prev!,
                [name]: value,
            }));
        }
    };

    const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData) return;

        try {
            const response = await fetch(`http://localhost:8080/cliente/${formData.email}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Informações atualizadas com sucesso!");
                navigation.push("/")
            } else {
                alert("Erro ao atualizar informações.");
            }
        } catch (error) {
            console.error("Erro ao atualizar o cliente:", error);
            alert("Erro ao atualizar informações. Tente novamente.");
        }
    };

    const handleDeleteAccount = async () => {
        if (!formData) return;

        const confirmDelete = window.confirm("Tem certeza de que deseja deletar sua conta? Esta ação não pode ser desfeita.");

        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8080/cliente/${formData.email}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert("Conta deletada com sucesso.");
                    localStorage.removeItem("userEmail");
                    navigation.push("/pages/login");
                } else {
                    alert("Erro ao deletar a conta.");
                }
            } catch (error) {
                console.error("Erro ao deletar o cliente:", error);
                alert("Erro ao deletar a conta. Tente novamente.");
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        navigation.push("/pages/login");
    };

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    if (!formData) {
        return <p>Erro ao carregar informações do usuário.</p>;
    }

    const formFields = [
        { label: "Nome", name: "nome", type: "text", placeholder: "Digite seu nome", required: true },
        { label: "Email", name: "email", type: "email", placeholder: "Digite seu email", required: true },
        { label: "CPF", name: "cpf", type: "text", placeholder: "Digite seu CPF", required: true, pattern: "[0-9]{11}", title: "Digite um CPF válido, por exemplo: 12345678901" },
        { label: "Telefone", name: "telefone", type: "tel", placeholder: "Digite seu telefone", required: true, pattern: "^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$", title: "Digite um telefone válido, por exemplo: (11) 94374-0709" },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-700 to-blue-500 px-4">
            <div className="w-full max-w-lg p-8 rounded-lg bg-white shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Meu Perfil</h2>
                <Form fields={formFields} onSubmit={handleSaveChanges} onChange={handleChange} values={formData} buttonText="Salvar Alterações" />
                <div className="flex justify-between mt-6">
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
                    >
                        Logout
                    </button>
                    <button
                        onClick={handleDeleteAccount}
                        className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
                    >
                        Deletar Conta
                    </button>
                </div>
            </div>
        </div>
    );
}
