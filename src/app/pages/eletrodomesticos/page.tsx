"use client";

import { Form } from "@/components/form";
import { Eletrodomestico } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EletrodomesticoForm() {
    const navigation = useRouter();
    const [formData, setFormData] = useState<Eletrodomestico>({
        nome: "",
        marca: "",
        modelo: "",
        potencia: 0,
        voltagem: "",
        tempoUso: 0,
        custoEstimado: 0,
    });

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userId, setUserId] = useState<number | null>(null);

    // Verificar se o usuário está logado
    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        const idCliente = localStorage.getItem("userId");

        if (email && idCliente) {
            setIsAuthenticated(true);
            setUserId(parseInt(idCliente, 10));
        } else {
            navigation.push("/pages/login");
        }
    }, [navigation]);

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
        { label: "Tempo de Uso (minutos)", name: "tempoUso", type: "number", placeholder: "Digite o tempo de uso do eletrodoméstico", required: true },
        { label: "Custo Estimado", name: "custoEstimado", type: "number", placeholder: "Custo estimado", readOnly: true },
    ];

    useEffect(() => {
        const potencia = formData.potencia;
        const tempoUso = formData.tempoUso;

        if (!isNaN(potencia) && !isNaN(tempoUso)) {
            const calculatedCost = calculateEstimatedCost(potencia, tempoUso);
            setFormData((prev) => ({
                ...prev,
                custoEstimado: calculatedCost,
            }));
        }
    }, [formData.potencia, formData.tempoUso]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const calculateEstimatedCost = (potencia: number, tempoUso: number): number => {
        const tarifa = 0.5;
        const potenciaKW = potencia / 1000; // Convertendo para kW
        const tempoHoras = tempoUso / 60; // Convertendo para horas
        return parseFloat((potenciaKW * tempoHoras * tarifa).toFixed(2)); // Arredondando para 2 casas decimais
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (userId === null) {
            alert("Usuário não autenticado");
            return;
        }

        try {
            // Adicionando o idCliente ao objeto formData antes de enviar
            const dataToSend: Eletrodomestico = {
                ...formData,
                idCliente: userId,
            };
            console.log(dataToSend);
            const response = await fetch("http://localhost:8080/eletrodomestico", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error("Erro ao salvar o eletrodoméstico");
            }

            alert("Eletrodoméstico cadastrado com sucesso!");
            navigation.push("/pages/meus-aparelhos");
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
