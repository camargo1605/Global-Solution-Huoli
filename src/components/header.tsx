import Image from "next/image";
import Logo from "../images/Huoli.png";
import { LoginBtn } from "./loginBtn";
import { RegistreBtn } from "./registreBtn";
import '../app/globals.css'
import Link from "next/link";

export function Header() {
    return (
        <header className="w-full flex items-center justify-between px-8 py-4 shadow-md">
            <div className="flex items-center space-x-4">
                <Link href={'/'}>
                    <Image src={Logo} alt="Huoli Logo" width={100} height={80} />
                </Link>
                <h1 className="text-xl font-bold text-gray-800">HUOLI TECH</h1>
            </div>
            <div className="flex items-center space-x-4">
                <RegistreBtn link="/pages/registro" />
                <span className="text-gray-500">ou</span>
                <LoginBtn link="/pages/login" />
            </div>
        </header>
    );
}
