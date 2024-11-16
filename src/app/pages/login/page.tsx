"use client";
import { Form } from "@/components/form";
import { Login } from "@/types/types";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const navigation = useRouter();
    const fields = [
        { label: "Email", name: "email", type: "email", placeholder: "Digite seu email", required: true, pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$", title: "Digite um email válido, por exemplo: teste@email.com" },
        { label: "Senha", name: "senha", type: "password", placeholder: "Digite sua senha", required: true },
    ];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data: Login = {
            email: formData.get('email') as string,
            senha: formData.get('senha') as string,
        };

        // Salvar o email no localStorage
        localStorage.setItem('userEmail', data.email);

        console.log(data);
        navigation.push('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-700 to-blue-500 px-4">
            <div className="w-full max-w-lg p-8 rounded-lg">
                <Form fields={fields} onSubmit={handleSubmit} buttonText="Entrar" />
            </div>
        </div>
    );
}
