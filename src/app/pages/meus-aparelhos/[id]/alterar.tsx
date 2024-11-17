"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Form } from "@/components/form";
import { Eletrodomestico } from "@/types/types";

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
        tempo_uso: 0,
        custo_estimado: 0,
        id_cliente: 0,
    });

    useEffect(() => {
        if (id) {
            console.log("ID obtido:", id); // Adicione este console.log para garantir que o ID está correto

            fetch(`http://localhost:8080/eletrodomestico/${id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erro ao buscar eletrodoméstico");
                    }
                    return response.json();
                })
                .then((data) => {
                    setFormData(data);
                })
                .catch((error) => {
                    console.error("Erro ao buscar eletrodoméstico:", error);
                });
        }
    }, [id]);

    const formFields = [
        { label: "Nome", name: "nome", type: "text", placeholder: "Digite o nome do eletrodoméstico", required: true },
        { label: "Marca", name: "marca", type: "text", placeholder: "Digite a marca do eletrodoméstico", required: true },
        { label: "Modelo", name: "modelo", type: "text", placeholder: "Digite o modelo do eletrodoméstico", required: true },
        { label: "Potência (W)", name: "potencia", type: "number", placeholder: "Digite a potência do eletrodoméstico", required: true },
        { label: "Voltagem", name: "voltagem", type: "text", placeholder: "Digite a voltagem do eletrodoméstico", required: true },
        { label: "Tempo de Uso (minutos)", name: "tempo_uso", type: "number", placeholder: "Digite o tempo de uso do eletrodoméstico", required: true },
        { label: "Custo Estimado", name: "custo_estimado", type: "number", placeholder: "Custo estimado", readOnly: true },
        { label: "ID Cliente", name: "id_cliente", type: "number", placeholder: "Digite o ID do cliente", required: true },
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-700 to-blue-500 px-4">
            <div className="w-full max-w-lg p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Alterar Eletrodoméstico</h2>
                <Form fields={formFields} onSubmit={handleSubmit} onChange={handleChange} values={formData} buttonText="Salvar Alterações" />
            </div>
        </div>
    );
}
