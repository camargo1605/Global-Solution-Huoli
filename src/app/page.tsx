import Image from "next/image";
import Energia from "../images/energia.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-tr from-blue-400 to-teal-700 flex items-center justify-center px-8">
      <div className="max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-white mb-4">
            Mais Economia, Menos Impacto Ambiental!
          </h1>
          <p className="text-lg text-white mb-6">
            Nossa plataforma ajuda você a entender e otimizar o consumo de energia em sua casa. Faça o seu consumo trabalhar a favor do seu bolso e do planeta!
          </p>
          <Link href={'/registro'} className="bg-white text-teal-700 font-semibold py-3 px-6 rounded-md hover:bg-gray-200 transition duration-300 inline-block">
            COMEÇE AGORA
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <Image src={Energia} alt="Home" width={500} height={450} className="rounded-md shadow-lg" />
        </div>
      </div>
    </div>
  );
}
