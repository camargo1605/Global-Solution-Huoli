"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eletrodomestico } from "@/types/types";

export default function MeusAparelhosPage() {
    const [eletrodomesticos, setEletrodomesticos] = useState<Eletrodomestico[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        const idCliente = localStorage.getItem("userId");

        if (email && idCliente) {
            setIsAuthenticated(true);
        } else {
            navigation.push("/login");
        }
    }, [navigation]);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (email) {
            fetch(`http://localhost:5000/find-eletrodomesticos?email=${email}`)
                .then((response) => response.json())
                .then((data) => {
                    setEletrodomesticos(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Erro ao buscar eletrodomésticos:", error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/eletrodomestico/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("Eletrodoméstico deletado com sucesso!");
                setEletrodomesticos(eletrodomesticos.filter((eletro) => eletro.idEletrodomestico !== id));
            } else {
                alert("Erro ao deletar eletrodoméstico.");
            }
        } catch (error) {
            console.error("Erro ao deletar eletrodoméstico:", error);
        }
    };

    const handleConfigure = async (idEletrodomestico: number) => {
        try {
            // Faz uma requisição para verificar se já existe uma configuração
            const response = await fetch(`http://localhost:8080/configuracaoConsumo/${idEletrodomestico}`);
            
            if (response.ok) {
                const configuracao = await response.json();
                
                if (configuracao) {
                    // Se houver configuração, redirecionar para a página de alteração
                    navigation.push(`/alterar-configuracao?id=${idEletrodomestico}`);
                } else {
                    // Se não houver configuração, redirecionar para a página de criação
                    navigation.push(`/nova-configuracao?id=${idEletrodomestico}`);
                }
            } else {
                throw new Error("Erro ao verificar a configuração de consumo.");
            }
        } catch (error) {
            console.error("Erro ao verificar a configuração de consumo:", error);
            alert("Erro ao verificar a configuração. Tente novamente.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-700 to-blue-500 px-4 py-8">
            <div className="w-full max-w-5xl p-8 rounded-lg bg-white shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Meus Eletrodomésticos</h2>
                {eletrodomesticos.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2 text-sm md:text-base">ID</th>
                                    <th className="border px-4 py-2 text-sm md:text-base">Nome</th>
                                    <th className="border px-4 py-2 text-sm md:text-base">Marca</th>
                                    <th className="border px-4 py-2 text-sm md:text-base">Custo Estimado</th>
                                    <th className="border px-4 py-2 text-sm md:text-base">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eletrodomesticos.map((eletro) => (
                                    <tr key={eletro.idEletrodomestico} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2 text-center text-sm md:text-base">{eletro.idEletrodomestico}</td>
                                        <td className="border px-4 py-2 text-center text-sm md:text-base">{eletro.nome}</td>
                                        <td className="border px-4 py-2 text-center text-sm md:text-base">{eletro.marca}</td>
                                        <td className="border px-4 py-2 text-center text-sm md:text-base">
                                            R$ {eletro.custoEstimado !== undefined ? eletro.custoEstimado.toFixed(2) : "N/A"}
                                        </td>
                                        <td className="border px-4 py-2 space-x-2 flex justify-center">
                                            <button
                                                onClick={() => navigation.push(`/meus-aparelhos/alterar?id=${eletro.idEletrodomestico}`)}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm md:text-base hover:bg-yellow-600"
                                            >
                                                Alterar
                                            </button>
                                            <button
                                                onClick={() => eletro.idEletrodomestico !== undefined && handleDelete(eletro.idEletrodomestico)}
                                                className="bg-red-500 text-white px-3 py-1 rounded text-sm md:text-base hover:bg-red-600"
                                            >
                                                Deletar
                                            </button>
                                            <button
                                                onClick={() => eletro.idEletrodomestico !== undefined && handleConfigure(eletro.idEletrodomestico)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm md:text-base hover:bg-blue-600"
                                            >
                                                Configurar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">Nenhum eletrodoméstico cadastrado.</p>
                )}
            </div>
        </div>
    );
}
