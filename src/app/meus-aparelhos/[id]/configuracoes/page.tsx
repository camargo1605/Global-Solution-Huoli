"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfiguracoesMenuPage() {
    const router = useRouter();
    const params = useParams();
    const idEletrodomestico = params?.id;

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/configuracaoConsumo/${idEletrodomestico}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("Configuração deletada com sucesso!");
                router.push(`/meus-aparelhos/${idEletrodomestico}`);
            } else {
                alert("Erro ao deletar a configuração.");
            }
        } catch (error) {
            console.error("Erro ao deletar a configuração:", error);
            alert("Erro ao deletar a configuração. Por favor, tente novamente.");
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-700 to-blue-500 px-4">
            <div className="w-full max-w-lg p-8 rounded-lg bg-white shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Configurações de Consumo</h2>
                <p className="text-center text-lg mb-4">Selecione uma ação para o eletrodoméstico ID: {idEletrodomestico}</p>
                <div className="flex flex-col space-y-4">
                    <button
                        onClick={() => router.push(`/meus-aparelhos/${idEletrodomestico}/configuracoes/nova-configuracao`)}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                    >
                        Adicionar Configuração
                    </button>
                    <button
                        onClick={() => router.push(`/meus-aparelhos/${idEletrodomestico}/configuracoes/alterar-configuracao`)}
                        className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300"
                    >
                        Alterar Configuração
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                    >
                        Deletar Configuração
                    </button>
                </div>
            </div>
        </div>
    );
}
