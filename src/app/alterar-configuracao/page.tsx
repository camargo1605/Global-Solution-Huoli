"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Form } from "@/components/form";
import { ConfiguracaoConsumo } from "@/types/types";

export default function AlterarConfiguracaoPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const idEletrodomestico = searchParams.get("id");

    const [formData, setFormData] = useState<ConfiguracaoConsumo>({
        idEletrodomestico: parseInt(idEletrodomestico ?? "0", 10),
        limiteConsumo: 0,
        acaoAposLimite: "",
    });
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        setIsAuthenticated(true);

        // Carregar os dados da configuração usando o ID fornecido
        if (idEletrodomestico) {
            fetch(`http://localhost:8080/configuracao-consumo/${idEletrodomestico}`)
                .then((response) => response.json())
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
    }, [idEletrodomestico, router]);

    const formFields = [
        { label: "Limite de Consumo (minutos ou watts)", name: "limiteConsumo", type: "number", placeholder: "Digite o limite de consumo", required: true },
        { label: "Ação após Limite", name: "acaoAposLimite", type: "text", placeholder: "Digite a ação a ser tomada (ex: alertar, desligar)", required: true },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/configuracao-consumo/${idEletrodomestico}`, {
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
            router.push("/meus-aparelhos");
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-700 to-blue-500 px-4">
            <div className="w-full max-w-lg p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Alterar Configuração de Consumo</h2>
                <Form fields={formFields} onSubmit={handleSubmit} onChange={handleChange} values={formData} buttonText="Salvar Alterações" />
            </div>
        </div>
    );
}
