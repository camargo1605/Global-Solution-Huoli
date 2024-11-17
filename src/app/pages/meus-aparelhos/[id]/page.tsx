"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Eletrodomestico } from "@/types/types";

export default function EletrodomesticoDetalhePage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    const [eletrodomestico, setEletrodomestico] = useState<Eletrodomestico | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8080/eletrodomestico/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setEletrodomestico(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Erro ao buscar eletrodoméstico:", error);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (!eletrodomestico) {
        return <p>Não foi possível carregar os detalhes do eletrodoméstico.</p>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-700 to-blue-500 px-4">
            <div className="w-full max-w-5xl p-8 rounded-lg bg-white shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Detalhes do Eletrodoméstico</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold">Nome:</h3>
                        <p>{eletrodomestico.nome}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Marca:</h3>
                        <p>{eletrodomestico.marca}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Modelo:</h3>
                        <p>{eletrodomestico.modelo}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Potência:</h3>
                        <p>{eletrodomestico.potencia} W</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Voltagem:</h3>
                        <p>{eletrodomestico.voltagem}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Tempo de Uso:</h3>
                        <p>{eletrodomestico.tempo_uso} minutos</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Custo Estimado:</h3>
                        <p>R$ {eletrodomestico.custo_estimado.toFixed(2)}</p>
                    </div>
                </div>
                <div className="mt-6 flex space-x-4 justify-center">
                    <button
                        onClick={() => router.push(`/meus-aparelhos/${id}/alterar`)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                        Alterar
                    </button>
                    <button
                        onClick={() => router.push(`/meus-aparelhos/${id}/configuracoes`)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Configurar
                    </button>
                </div>
            </div>
        </div>
    );
}
