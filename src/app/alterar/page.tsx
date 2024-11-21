"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

export default function AlterarEletrodomesticoPage() {
    const router = useRouter();
    const params = useParams();
    const idEletrodomestico = params?.id;

    const [formData, setFormData] = useState({
        nome: "",
        marca: "",
        modelo: "",
        potencia: 0,
        voltagem: "",
        tempoUso: 0,
        custoEstimado: 0,
    });

    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
        } else {
            setIsAuthenticated(true);

            // Carregar os dados do eletrodoméstico usando o ID fornecido
            if (idEletrodomestico) {
                fetch(`http://localhost:8080/eletrodomestico/${idEletrodomestico}`)
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
        }
    }, [idEletrodomestico, router]);

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
            const response = await fetch(`http://localhost:8080/eletrodomestico/${idEletrodomestico}`, {
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

    return (
        <Suspense fallback={<p>Carregando...</p>}>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-700 to-blue-500 px-4">
                <div className="w-full max-w-lg p-8 rounded-lg bg-white shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Alterar Eletrodoméstico</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Nome"
                            className="p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            name="marca"
                            value={formData.marca}
                            onChange={handleChange}
                            placeholder="Marca"
                            className="p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            name="modelo"
                            value={formData.modelo}
                            onChange={handleChange}
                            placeholder="Modelo"
                            className="p-2 border rounded"
                            required
                        />
                        <input
                            type="number"
                            name="potencia"
                            value={formData.potencia}
                            onChange={handleChange}
                            placeholder="Potência (W)"
                            className="p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            name="voltagem"
                            value={formData.voltagem}
                            onChange={handleChange}
                            placeholder="Voltagem"
                            className="p-2 border rounded"
                            required
                        />
                        <input
                            type="number"
                            name="tempoUso"
                            value={formData.tempoUso}
                            onChange={handleChange}
                            placeholder="Tempo de Uso (minutos)"
                            className="p-2 border rounded"
                            required
                        />
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            Salvar Alterações
                        </button>
                    </form>
                </div>
            </div>
        </Suspense>
    );
}
