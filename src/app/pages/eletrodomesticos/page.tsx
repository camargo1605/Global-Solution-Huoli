"use client";

import { Form } from "@/components/form";
import { Eletrodomestico } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EletrodomesticoForm() {
    const navigator = useRouter();
    const [formData, setFormData] = useState<Eletrodomestico>({
        nome: "",
        marca: "",
        modelo: "",
        potencia: 0,
        voltagem: "",
        tempo_uso: 0,
        custo_estimado: 0,
        id_cliente: 0,
    });

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Verificar se o usuário está logado
    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (email) {
            setIsAuthenticated(true);
        } else {
            navigator.push("/pages/login");
        }
    }, [navigator]);

    type FormField = {
        label: string;
        name: keyof typeof formData;
        type: string;
        placeholder: string;
        required?: boolean;
        readOnly?: boolean;
    };

    const formFields: FormField[] = [
        { label: "Nome", name: "nome", type: "text", placeholder: "Digite o nome do eletrodoméstico", required: true },
        { label: "Marca", name: "marca", type: "text", placeholder: "Digite a marca do eletrodoméstico", required: true },
        { label: "Modelo", name: "modelo", type: "text", placeholder: "Digite o modelo do eletrodoméstico", required: true },
        { label: "Potência (W)", name: "potencia", type: "number", placeholder: "Digite a potência do eletrodoméstico", required: true },
        { label: "Voltagem", name: "voltagem", type: "text", placeholder: "Digite a voltagem do eletrodoméstico", required: true },
        { label: "Tempo de Uso (minutos)", name: "tempo_uso", type: "number", placeholder: "Digite o tempo de uso do eletrodoméstico", required: true },
        { label: "Custo Estimado", name: "custo_estimado", type: "number", placeholder: "Custo estimado", readOnly: true },
        { label: "ID Cliente", name: "id_cliente", type: "number", placeholder: "Digite o ID do cliente", required: true },
    ];

    useEffect(() => {
        const potencia = formData.potencia;
        const tempo_uso = formData.tempo_uso;

        if (!isNaN(potencia) && !isNaN(tempo_uso)) {
            const calculatedCost = calculateEstimatedCost(potencia, tempo_uso);
            setFormData((prev) => ({
                ...prev,
                custo_estimado: calculatedCost,
            }));
        }
    }, [formData.potencia, formData.tempo_uso]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const calculateEstimatedCost = (potencia: number, tempo_uso: number): number => {
        const tarifa = 0.5;
        const potenciaKW = potencia / 1000; // Convertendo para kW
        const tempoHoras = tempo_uso / 60; // Convertendo para horas
        return parseFloat((potenciaKW * tempoHoras * tarifa).toFixed(2)); // Arredondando para 2 casas decimais
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/eletrodomesticos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Erro ao salvar o eletrodoméstico");
            }

            alert("Eletrodoméstico cadastrado com sucesso!");
            navigator.push("/pages/meus-aparelhos");
        } catch (error) {
            console.error("Erro ao salvar o eletrodoméstico:", error);
            alert("Erro ao salvar o eletrodoméstico, tente novamente.");
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-700 to-blue-500 px-4">
            <div className="w-full max-w-lg p-8 rounded-lg">
                <Form fields={formFields} onSubmit={handleSubmit} onChange={handleChange} values={formData} buttonText="Salvar" />
            </div>
        </div>
    );
}
