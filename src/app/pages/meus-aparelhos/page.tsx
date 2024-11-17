"use client";

import { useEffect, useState } from "react";

interface Eletrodomestico {
    id_eletrodomestico: number;
    nome: string;
    marca: string;
    custo_estimado: number;
}

export default function MeusAparelhosPage() {
    const [eletrodomesticos, setEletrodomesticos] = useState<Eletrodomestico[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Obtendo o email do usuário do localStorage
        const email = localStorage.getItem("userEmail");

        if (email) {
            // Fazendo a requisição para buscar os eletrodomésticos do usuário específico
            fetch(`http://localhost:5000//find-eletrodomesticos?email=${email}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erro ao buscar eletrodomésticos");
                    }
                    return response.json();
                })
                .then((data) => {
                    setEletrodomesticos(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Erro ao buscar eletrodomésticos:", error);
                    setError("Não foi possível buscar os eletrodomésticos. Tente novamente mais tarde.");
                    setLoading(false);
                });
        } else {
            setLoading(false);
            setError("Usuário não está autenticado.");
        }
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p className="text-red-300 font-extrabold text-center min-h-screen mt-10">{error}</p>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-700 to-blue-500 px-4">
            <div className="w-full max-w-5xl p-8 rounded-lg bg-white shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Meus Eletrodomésticos</h2>
                {eletrodomesticos.length > 0 ? (
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Nome</th>
                                <th className="px-4 py-2">Marca</th>
                                <th className="px-4 py-2">Custo Estimado (R$)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eletrodomesticos.map((eletro) => (
                                <tr key={eletro.id_eletrodomestico} className="text-center border-b">
                                    <td className="px-4 py-2">{eletro.id_eletrodomestico}</td>
                                    <td className="px-4 py-2">{eletro.nome}</td>
                                    <td className="px-4 py-2">{eletro.marca}</td>
                                    <td className="px-4 py-2">{eletro.custo_estimado.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-600">Nenhum eletrodoméstico cadastrado.</p>
                )}
            </div>
        </div>
    );
}
