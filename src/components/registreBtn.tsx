import Link from "next/link";
import '../app/globals.css'

interface RegistreBtnProps {
    link: string;
}

export function RegistreBtn({ link }: RegistreBtnProps) {
    return (
        <Link href={link} className="bg-transparent text-teal-600 font-medium text-base hover:underline transform hover:scale-110 transition duration-300">
            Registrar!
        </Link>
    );
}
