import Image from "next/image";
import Energia from "../images/energia.jpg";

export default function Home() {
  return (
    <div className="h-screen bg-teal-700 flex items-center justify-center px-8">
      <div className="max-w-5xl flex flex-wrap items-center justify-between gap-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-white mb-4">
            Mais Economia, Menos Impacto Ambiental!
          </h1>
          <p className="text-lg text-white mb-6">
            Nossa plataforma ajuda você a entender e otimizar o consumo de energia em sua casa. Faça o seu consumo trabalhar a favor do seu bolso e do planeta!
          </p>
          <button className="bg-white text-teal-700 font-semibold py-3 px-6 rounded-md hover:bg-gray-200 transition duration-300">
            COMEÇE AGORA
          </button>
        </div>

        <div className="flex-1 flex justify-center">
          <Image src={Energia} alt="Home" width={400} height={300} className="rounded-md shadow-lg"/>
        </div>
      </div>
    </div>
  );
}
