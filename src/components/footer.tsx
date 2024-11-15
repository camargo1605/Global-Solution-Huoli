import Link from "next/link";
import '../app/globals.css'

export function Footer() {
    return (
        <footer className="w-full flex-col flex items-center justify-center py-4 bg-gray-800 text-white">
            <p className="text-sm">© 2024 Huoli Tech. Todos os direitos reservados.</p>
            <Link href="/pages/integrantes" className="text-sm hover:underline text-teal-400">
                Integrantes
            </Link>
        </footer>
    );
}
