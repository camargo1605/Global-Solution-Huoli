"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Eletrodomestico } from "@/types/types";
import { Form } from "@/components/form";

export default function AlterarEletrodomesticoPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    const [formData, setFormData] = useState<Eletrodomestico>({
        nome: "",
        marca: "",
        modelo: "",
        potencia: 0,
        voltagem: "",
        tempoUso: 0,
        custoEstimado: 0,
        idCliente: 0,
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

        // Carregar os dados do eletrodoméstico usando o ID fornecido
        if (id) {
            fetch(`http://localhost:8080/eletrodomestico/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setFormData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Erro ao buscar eletrodoméstico:", error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [id, router]);

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
        const tarifa = 0.5; // Valor da tarifa por kWh
        const potenciaKW = potencia / 1000; // Convertendo para kW
        const tempoHoras = tempoUso / 60; // Convertendo para horas
        return parseFloat((potenciaKW * tempoHoras * tarifa).toFixed(2)); // Arredondando para 2 casas decimais
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form data:", formData);

        try {
            const response = await fetch(`http://localhost:8080/eletrodomestico/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar o eletrodoméstico");
            }

            alert("Eletrodoméstico atualizado com sucesso!");
            router.push("/meus-aparelhos");
        } catch (error) {
            console.error("Erro ao atualizar o eletrodoméstico:", error);
            alert("Erro ao atualizar o eletrodoméstico. Por favor, tente novamente.");
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (!isAuthenticated) {
        return null;
    }

    const formFields = [
        { label: "Nome", name: "nome", type: "text", placeholder: "Digite o nome do eletrodoméstico", required: true },
        { label: "Marca", name: "marca", type: "text", placeholder: "Digite a marca do eletrodoméstico", required: true },
        { label: "Modelo", name: "modelo", type: "text", placeholder: "Digite o modelo do eletrodoméstico", required: true },
        { label: "Potência (W)", name: "potencia", type: "number", placeholder: "Digite a potência do eletrodoméstico", required: true },
        { label: "Voltagem", name: "voltagem", type: "text", placeholder: "Digite a voltagem do eletrodoméstico", required: true },
        { label: "Tempo de Uso (minutos)", name: "tempoUso", type: "number", placeholder: "Digite o tempo de uso do eletrodoméstico", required: true },
        { label: "Custo Estimado", name: "custoEstimado", type: "number", placeholder: "Custo estimado", readOnly: true },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-700 to-blue-500 px-4">
            <div className="w-full max-w-lg p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Alterar Eletrodoméstico</h2>
                <Form fields={formFields} onSubmit={handleSubmit} onChange={handleChange} values={formData} buttonText="Salvar Alterações" />
            </div>
        </div>
    );
}
