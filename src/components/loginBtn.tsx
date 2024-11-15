import Link from "next/link";
import '../app/globals.css'

interface LoginBtnProps {
    link: string;
}

export function LoginBtn({ link }: LoginBtnProps) {
    return (
        <Link href={link} className="bg-teal-500 text-white font-medium text-base transform hover:scale-110 transition duration-300 px-4 py-2 rounded-md">
            Iniciar sessão
        </Link>
    );
}
