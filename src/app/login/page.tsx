"use client";

import { Form } from "@/components/form";
import { Login } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const navigation = useRouter();

    const [formData, setFormData] = useState<Login>({
        email: "",
        senha: "",
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fields = [
        { label: "Email", name: "email", type: "email", placeholder: "Digite seu email", required: true, pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$", title: "Digite um email válido, por exemplo: teste@email.com" },
        { label: "Senha", name: "senha", type: "password", placeholder: "Digite sua senha", required: true },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                localStorage.setItem("userEmail", responseData.email);
                localStorage.setItem("userId", responseData.idCliente);
                navigation.push("/");
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || "Erro ao realizar login");
            }
        } catch (error) {
            console.error("Erro ao tentar fazer login:", error);
            setErrorMessage("Erro ao conectar ao servidor. Tente novamente mais tarde.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-700 to-blue-500 px-4">
            <div className="w-full max-w-lg p-8 rounded-lg">
                <Form 
                    fields={fields}
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    values={formData}
                    buttonText="Entrar"
                />
                {errorMessage && (
                    <p className="text-red-300 font-extrabold text-center mt-4">{errorMessage}</p>
                )}
            </div>
        </div>
    );
}
