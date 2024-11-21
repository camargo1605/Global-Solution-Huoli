"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Form } from "@/components/form";
import { ConfiguracaoConsumo } from "@/types/types";

export default function AlterarConfiguracaoPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    const [formData, setFormData] = useState<ConfiguracaoConsumo>({
        idEletrodomestico: 0,
        limiteConsumo: 0,
        acaoAposLimite: "",
    });

    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/pages/login");
            return;
        }

        setIsAuthenticated(true);

        // Carregar os dados da configuração usando o ID fornecido
        if (id) {
            fetch(`http://localhost:8080/configuracaoConsumo/${id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erro ao buscar configuração de consumo");
                    }
                    return response.json();
                })
                .then((data) => {
                    setFormData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Erro ao buscar configuração de consumo:", error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [id, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form data:", formData);

        try {
            const response = await fetch(`http://localhost:8080/configuracaoConsumo/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar a configuração de consumo");
            }

            alert("Configuração de consumo atualizada com sucesso!");
            router.push(`/meus-aparelhos/${formData.idEletrodomestico}/menu-configuracao`);
        } catch (error) {
            console.error("Erro ao atualizar a configuração de consumo:", error);
            alert("Erro ao atualizar a configuração. Por favor, tente novamente.");
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (!isAuthenticated) {
        return null;
    }

    const formFields = [
        { label: "Limite de Consumo", name: "limiteConsumo", type: "number", placeholder: "Digite o limite de consumo", required: true },
        { label: "Ação Após o Limite", name: "acaoAposLimite", type: "text", placeholder: "Digite a ação após o limite (ex: desligar, alertar)", required: true },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-700 to-blue-500 px-4">
            <div className="w-full max-w-lg p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Alterar Configuração de Consumo</h2>
                <Form fields={formFields} onSubmit={handleSubmit} onChange={handleChange} values={formData} buttonText="Salvar Alterações" />
            </div>
        </div>
    );
}
