import Link from "next/link";
import i404 from "../images/404.png";
import Image from "next/image";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-900 via-gray-900 to-black text-white px-4">
            <Image src={i404} alt="404" width={300} height={300} />
            <h2 className="text-2xl font-semibold mt-4 mb-6">Página Não Encontrada</h2>
            <p className="text-lg mb-8">
                Parece que a página que você está procurando não existe. Talvez você queira voltar para a página inicial?
            </p>
            <Link href="/" className="bg-teal-500 font-bold text-white py-3 px-6 rounded-md hover:bg-teal-600 transition duration-300">
                Voltar para Home
            </Link>
        </div>
    );
}
