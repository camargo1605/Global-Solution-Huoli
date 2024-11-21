"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { Form } from "@/components/form";

export default function NovaConfiguracaoPage() {
    const router = useRouter();
    const params = useParams();
    const idEletrodomestico = params?.id;

    const [formData, setFormData] = useState({
        limiteConsumo: 0,
        acaoAposLimite: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!idEletrodomestico) {
            alert("ID do eletrodoméstico não encontrado.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/configuracaoConsumo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idEletrodomestico: parseInt(Array.isArray(idEletrodomestico) ? idEletrodomestico[0] : idEletrodomestico, 10),
                    ...formData,
                }),
            });

            if (response.ok) {
                alert("Configuração adicionada com sucesso!");
                router.push(`/meus-aparelhos/${idEletrodomestico}/configuracoes`);
            } else {
                throw new Error("Erro ao adicionar a configuração de consumo.");
            }
        } catch (error) {
            console.error("Erro ao adicionar a configuração de consumo:", error);
            alert("Erro ao adicionar a configuração de consumo. Tente novamente.");
        }
    };

    const formFields = [
        { label: "Limite de Consumo", name: "limiteConsumo", type: "number", placeholder: "Digite o limite de consumo", required: true },
        { label: "Ação Após o Limite", name: "acaoAposLimite", type: "text", placeholder: "Digite a ação após o limite (ex: desligar, alertar)", required: true },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-700 to-blue-500 px-4">
            <div className="w-full max-w-lg p-8 rounded-lg bg-white shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Nova Configuração de Consumo</h2>
                <Form fields={formFields} onSubmit={handleSubmit} onChange={handleChange} values={formData} buttonText="Salvar Configuração" />
            </div>
        </div>
    );
}
