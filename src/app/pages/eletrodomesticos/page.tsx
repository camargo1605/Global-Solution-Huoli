"use client";
import { Form } from "@/components/form";
import { Eletrodomestico } from "@/types/types";
import { useRouter } from "next/navigation";

export default function EletrodomesticosPage() {
    const navigation = useRouter();
    const fields = [
        { label: "Nome", name: "nome", type: "text", placeholder: "Digite o nome do eletrodoméstico", required: true },
        { label: "Marca", name: "marca", type: "text", placeholder: "Digite a marca do eletrodoméstico", required: true },
        { label: "Modelo", name: "modelo", type: "text", placeholder: "Digite o modelo do eletrodoméstico", required: true },
        { label: "Potência", name: "potencia", type: "number", placeholder: "Digite a potência do eletrodoméstico", required: true },
        { label: "Voltagem", name: "voltagem", type: "text", placeholder: "Digite a voltagem do eletrodoméstico", required: true },
        { label: "Tempo de Uso (minutos)", name: "tempo_uso", type: "number", placeholder: "Digite o tempo de uso do eletrodoméstico", required: true },
        { label: "Custo Estimado", name: "custo_estimado", type: "number", placeholder: "Digite o custo estimado do consumo", required: true },
        { label: "ID Cliente", name: "id_cliente", type: "number", placeholder: "Digite o ID do cliente", required: true },
    ];

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data: Eletrodomestico = {
            dt_registro: new Date().toISOString(),
            nome: formData.get('nome') as string,
            marca: formData.get('marca') as string,
            modelo: formData.get('modelo') as string,
            potencia: Number(formData.get('potencia')),
            voltagem: formData.get('voltagem') as string,
            tempo_uso: Number(formData.get('tempo_uso')),
            custo_estimado: Number(formData.get('custo_estimado')),
            id_cliente: Number(formData.get('id_cliente')),
        };

        try {
            const response = await fetch("http://localhost:8080/eletrodomesticos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Erro ao cadastrar eletrodoméstico");
            }

            alert("Eletrodoméstico cadastrado com sucesso!");
            navigation.push(`/meus-aparelhos`);
        } catch (error) {
            console.error("Erro ao cadastrar eletrodoméstico:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-700 to-blue-500 px-4">
            <div className="w-full max-w-lg p-8 rounded-lg">
                <Form fields={fields} onSubmit={handleSubmit} buttonText="Cadastrar Eletrodoméstico" />
            </div>
        </div>
    );
}
